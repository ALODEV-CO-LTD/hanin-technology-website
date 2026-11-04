"""Chỉnh ảnh AI cho giống ảnh thật: nén bão hòa (nhất là xanh dương, cam), sáng nhẹ, thêm clarity chống đục, hạt phim."""
import numpy as np
from PIL import Image, ImageFilter
def rgb2hsv(a):
    r,g,b=a[...,0],a[...,1],a[...,2];mx=a.max(-1);mn=a.min(-1);d=mx-mn
    h=np.zeros_like(mx);m=d>1e-6
    rc=(mx==r)&m;gc=(mx==g)&m&~rc;bc=(mx==b)&m&~rc&~gc
    h[rc]=((g-b)[rc]/d[rc])%6;h[gc]=(b-r)[gc]/d[gc]+2;h[bc]=(r-g)[bc]/d[bc]+4
    s=np.where(mx>1e-6,d/np.maximum(mx,1e-6),0);return h*60,s,mx
def hsv2rgb(h,s,v):
    c=v*s;hp=(h/60)%6;x=c*(1-np.abs(hp%2-1));z=np.zeros_like(c)
    conds=[(hp<1),(hp<2),(hp<3),(hp<4),(hp<5),(hp>=5)]
    R=np.select(conds,[c,x,z,z,x,c]);G=np.select(conds,[x,c,c,x,z,z]);B=np.select(conds,[z,z,x,c,c,x])
    m=v-c;return np.stack([R+m,G+m,B+m],-1)
def realify(im,seed=0,sat=0.48,expo=0.08,clarity=0.30,grain=1.0):
    rng=np.random.default_rng(seed)
    w,h0=im.size
    if w>900: im=im.filter(ImageFilter.GaussianBlur(0.5))
    a=np.asarray(im.convert('RGB'),dtype=np.float32)/255
    H,S,V=rgb2hsv(a)
    blue=np.exp(-((((H-215+180)%360)-180)/50.0)**2)
    warm=np.exp(-((((H-25+180)%360)-180)/35.0)**2)           # cam/đỏ chói
    # bão hòa: nén mạnh pixel đã quá bão hòa (vibrance ngược), thêm giảm xanh dương và cam
    S2=S*(1-sat*(0.55+0.45*S))*(1-0.45*blue)*(1-0.15*warm)
    # sáng hơn, nhẹ hơn; chỉ nhấc vùng tối rất nhẹ để không đục
    V2=np.power(np.clip(V,0,1),1-expo)
    V2=V2*0.97+0.015
    out=np.clip(hsv2rgb(H,np.clip(S2,0,1),np.clip(V2,0,1)),0,1)
    # clarity: tăng tương phản cục bộ ở kênh sáng để bớt cảm giác đục/mờ
    L=(0.299*out[...,0]+0.587*out[...,1]+0.114*out[...,2])
    big=np.asarray(Image.fromarray((L*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(max(6,w//60))),dtype=np.float32)/255
    d=(L-big)*clarity
    out=np.clip(out+d[...,None],0,1)
    # cân bằng trắng nhẹ
    Lm=out.mean(-1,keepdims=True);gain=np.array([1.012,1.0,0.982],dtype=np.float32)
    out=out*(1+(gain-1)*(0.4+0.6*Lm))
    hh,ww=out.shape[:2]
    def noise(sig,blur):
        n=rng.normal(0,sig,(hh,ww)).astype(np.float32)
        if blur>0:
            n=np.asarray(Image.fromarray(((n*4+0.5).clip(0,1)*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(blur)),dtype=np.float32)/255
            n=(n-0.5)/4*(1.0+blur)
        return n
    lum=noise(0.012*grain,0.55)
    amp=(0.55+0.9*(1-np.abs(Lm[...,0]-0.45)*1.3)).clip(0.4,1.4)
    out=out+(lum*amp)[...,None]
    for c,k in enumerate((0.55,0.4,0.6)): out[...,c]+=noise(0.006*grain,0.8)*k
    yy,xx=np.mgrid[0:hh,0:ww].astype(np.float32);dd=((xx/ww-0.5)**2+(yy/hh-0.5)**2)
    out=out*(1-0.07*dd)[...,None]
    return Image.fromarray((np.clip(out,0,1)*255+0.5).astype(np.uint8))
