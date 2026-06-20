import type { Metadata } from "next";
import AnimatedSection from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "我的器材",
  description:
    "Han Visuals 摄影和视频创作所使用的相机、镜头与设备。",
};

const gearCategories = [
  {
    name: "相机",
    items: [
      { name: "Sony FX3", detail: "主力电影机 — 4K 120p，S-Log3，主动散热" },
      { name: "Sony A7S III", detail: "照片视频双修 — 出色的低光表现" },
      { name: "Leica Q2", detail: "随身机 — 4700 万像素全画幅，固定 28mm Summilux 镜头" },
    ],
  },
  {
    name: "镜头",
    items: [
      { name: "Sony 24mm f/1.4 GM", detail: "广角环境镜头 — 建筑、风光、星空" },
      { name: "Sony 35mm f/1.4 GM", detail: "叙事之眼 — 占据了 60% 的拍摄工作量" },
      { name: "Sony 50mm f/1.2 GM", detail: "真实呈现者 — 自然透视，梦幻焦外" },
      { name: "Sony 85mm f/1.4 GM", detail: "人像与细节 — 压缩感恰到好处，不显扁平" },
      { name: "Sony 90mm f/2.8 Macro G", detail: "产品与微距 — 任何距离都锐利无比" },
    ],
  },
  {
    name: "灯光",
    items: [
      { name: "Aputure 300d II", detail: "主灯 — 350W COB LED，Bowens 卡口" },
      { name: "Nanlite PavoTube 30C", detail: "RGB 灯管 — 点缀光、场景光和色彩渲染" },
      { name: "Aputure MC Pro", detail: "迷你 RGB — 隐藏式实景光，重点补光" },
      { name: "Aputure Light Dome II", detail: "柔光箱 — 90cm，主力柔光工具" },
    ],
  },
  {
    name: "支撑系统",
    items: [
      { name: "DJI RS 3 Pro", detail: "稳定器 — 承重 4.5kg，LiDAR 对焦" },
      { name: "Peak Design Travel Tripod", detail: "碳纤维 — 轻便，常年放在包里" },
    ],
  },
  {
    name: "软件",
    items: [
      { name: "DaVinci Resolve Studio", detail: "主力调色软件 — 自定义胶片模拟节点树" },
      { name: "Adobe Lightroom Classic", detail: "照片后期 — 联机拍摄与移动端工作流" },
      { name: "Adobe Premiere Pro", detail: "时间线剪辑 — 素材粗剪与精编" },
      { name: "Capture One Pro", detail: "联机拍摄 — 商业片拍摄与客户审片" },
    ],
  },
];

export default function GearPage() {
  return (
    <div className="pt-32 pb-24">
      <AnimatedSection className="px-6 md:px-12 mb-16">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] font-light tracking-[0.35em] text-white/40 uppercase mb-4">
            我的器材
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-thin tracking-tight text-white">
            创作工具
          </h1>
          <p className="mt-6 text-base sm:text-lg font-light text-white/30 max-w-xl">
            我在摄影、视频创作和调色中所依赖的设备。器材重要，但审美更重要。
          </p>
        </div>
      </AnimatedSection>

      <div className="px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto space-y-20">
          {gearCategories.map((category, ci) => (
            <AnimatedSection key={category.name} delay={ci * 0.08}>
              <p className="text-[11px] font-light tracking-[0.25em] text-white/30 uppercase mb-8">
                {category.name}
              </p>
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 py-4 border-b border-white/[0.04]"
                  >
                    <span className="text-sm font-light text-white/70 w-48 shrink-0">
                      {item.name}
                    </span>
                    <span className="text-sm font-light text-white/25 leading-relaxed">
                      {item.detail}
                    </span>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
