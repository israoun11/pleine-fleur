# Render a warm beige arch-alcove studio and place a cut-out bag on its plinth.
import numpy as np, sys, json
from PIL import Image, ImageFilter
W,H=1200,1500
OUT=(760,950)          # delivered size
SRC_SCALE=3            # cut-outs are stored at 3x the original photo
SMAX=2.0/SRC_SCALE/(OUT[0]/W)   # never more than 2x the original pixels
def smooth(x): x=np.clip(x,0,1); return x*x*(3-2*x)
def render_bg():
    y,x=np.mgrid[0:H,0:W].astype(np.float32)
    wall=np.array([241,227,209],np.float32); 
    img=np.ones((H,W,3),np.float32)*wall
    # soft key light from upper left on wall
    g=np.exp(-(((x-W*0.35)/(W*0.9))**2+((y-H*0.15)/(H*0.9))**2))
    img+= (g[...,None]*np.array([14,12,10]))
    # arch geometry
    ax0,ax1=W*0.15,W*0.85; r=(ax1-ax0)/2; cx=W/2; top=H*0.10; spring=top+r; floor=H*0.70
    inside=((x>=ax0)&(x<=ax1)&(y>=spring)&(y<=floor)) | (((x-cx)**2+(y-spring)**2<=r*r)&(y<spring))
    # distance to arch edge for soft reveal shading
    dx=np.minimum(x-ax0,ax1-x); 
    dc=r-np.sqrt((x-cx)**2+(y-spring)**2)
    d=np.where(y<spring,dc,dx); d=np.where(inside,d,0)
    # interior: cylinder-like shading, lighter centre, darker near edges, darker top
    u=(x-cx)/r
    interior=np.array([232,214,192],np.float32)
    shade=1-0.10*np.clip(np.abs(u),0,1)**2 - 0.05*smooth((spring-y)/r)
    glow=np.exp(-(((x-cx)/(r*0.75))**2+((y-(spring+H*0.12))/(H*0.38))**2))
    inner=interior[None,None,:]*shade[...,None]+glow[...,None]*np.array([16,14,11])
    # inner edge occlusion (recess depth)
    occl=1-0.13*np.exp(-d/14)
    inner*=occl[...,None]
    img=np.where(inside[...,None],inner,img)
    # lit reveal rim on left edge of arch (light from upper left)
    rim=np.exp(-np.abs(d-3)/2.2)*(inside)*(u<0)*0.6
    img+= rim[...,None]*np.array([16,14,12])
    # floor / ledge below arch
    fl=y>floor
    fy=(y-floor)/(H-floor)
    floorc=np.array([238,224,206],np.float32)*(1-0.07*fy)[...,None]
    img=np.where(fl[...,None],floorc,img)
    edge=np.exp(-np.abs(y-floor)/2.0)*0.5; img-=edge[...,None]*np.array([22,20,18])
    # round plinth (cylinder): top ellipse + front face
    pcx=cx; pr=W*0.33; ptop=H*0.765; pry=H*0.036; ph=H*0.12
    ey=((x-pcx)/pr)**2+((y-ptop)/pry)**2<=1
    front=(np.abs(x-pcx)<=pr)&(y>=ptop)&(y<=ptop+ph+pry*np.sqrt(np.clip(1-((x-pcx)/pr)**2,0,1)))
    fu=(x-pcx)/pr
    fv=np.clip((y-ptop)/ph,0,1)
    frontc=np.array([240,224,203],np.float32)*(1-0.10*fu**2-0.04*np.clip(fu,0,1)-0.06*fv)[...,None]
    # plinth shadow on floor
    sh=np.exp(-(((x-pcx)/(pr*1.08))**2+((y-(ptop+ph+pry+6))/(pry*1.6))**2))*0.18
    img*=(1-sh)[...,None]
    img=np.where(front[...,None],frontc,img)
    topc=np.array([248,239,227],np.float32)*(1-0.05*((x-pcx)/pr)**2)[...,None]
    img=np.where(ey[...,None],topc,img)
    rimt=np.exp(-np.abs(np.sqrt(((x-pcx)/pr)**2+((y-ptop)/pry)**2)-1)*pr/2.5)*(y>ptop)*0.5
    img+=rimt[...,None]*np.array([8,7,6])
    # film grain
    img+=np.random.default_rng(3).normal(0,1.4,img.shape)
    return np.clip(img,0,255).astype(np.uint8), dict(cx=cx,ptop=ptop,pr=pr,pry=pry,spring=spring,top=top,r=r,floor=floor)
def place(bg,geo,cut_path,body):
    bag=Image.open(cut_path).convert('RGBA'); a=np.asarray(bag)[:,:,3]
    ys,xs=np.where(a>20); bb=[xs.min(),ys.min(),xs.max(),ys.max()]
    bx0,by0,bx1,by1=body if body else bb
    bag=bag.crop((bb[0],bb[1],bb[2]+1,bb[3]+1))
    fw,fh=bag.size; bodyw=bx1-bx0; bottom_off=(by1-bb[1])
    # scale: bag body ~ 66% of arch width, whole bag fits under arch top
    s=min(0.74*2*geo['r']/bodyw, (geo['ptop']-geo['top']-40)/fh, 1.0*2*geo['r']/fw)
    s=min(s,SMAX)  # cap enlargement of the original photo (see OUT)
    global LAST_S; LAST_S=s
    bag=bag.resize((int(fw*s),int(fh*s)),Image.LANCZOS)
    cxb=(bb[2]-bb[0])/2*s   # centre on the whole bag outline
    X=int(geo['cx']-cxb); Y=int(geo['ptop']+geo['pry']*0.25-bottom_off*s)
    base=Image.fromarray(bg).convert('RGBA')
    # contact shadow + soft cast shadow
    sh=Image.new('L',base.size,0); arr=np.zeros((base.size[1],base.size[0]),np.float32)
    yy,xx=np.mgrid[0:base.size[1],0:base.size[0]]
    bwid=bodyw*s/2; by=Y+bottom_off*s
    bcx=X+((bx0+bx1)/2-bb[0])*s
    arr+=np.exp(-(((xx-bcx)/(bwid*1.0))**2+((yy-by)/8)**2))*130
    arr+=np.exp(-(((xx-bcx-bwid*0.18)/(bwid*1.25))**2+((yy-by+4)/28)**2))*70
    sh=Image.fromarray(np.clip(arr,0,255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(3))
    base.paste(Image.new('RGBA',base.size,(92,66,44,255)),(0,0),sh)
    # faint back shadow on arch wall (light from upper left)
    P=120; al=Image.new('L',(bag.width+2*P,bag.height+2*P),0); al.paste(bag.split()[3],(P,P))
    al=al.filter(ImageFilter.GaussianBlur(36)).point(lambda v:int(v*0.15))
    base.paste(Image.new('RGBA',al.size,(110,82,56,255)),(X+40-P,Y+16-P),al)
    base.alpha_composite(bag,(X,Y))
    return base.convert('RGB')
if __name__=='__main__':
    bg,geo=render_bg()
    meta=json.load(open('/home/claude/work/meta.json'))
    out=[]
    for n in sys.argv[1:]:
        body=meta[n]['body']
        im=place(bg,geo,f'/home/claude/work/cut2/{n}.png',body)
        im.resize(OUT,Image.LANCZOS).save(f'/home/claude/work/studio/{n}.png')
        print(n, 'enlargement vs original photo: %.2fx' % (LAST_S*SRC_SCALE*OUT[0]/W))
