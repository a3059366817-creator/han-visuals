import type { Metadata } from "next";
import AnimatedSection from "@/components/shared/AnimatedSection";

export const metadata: Metadata = {
  title: "关于我",
  description:
    "Han 是一位常驻中国的摄影师、视频创作者和调色师。他的作品游走于电影叙事与极简美学之间。",
};

const services = [
  {
    title: "摄影",
    description:
      "商业拍摄、个人项目和艺术创作。从产品广告到街头影像，每一帧都围绕光线展开。",
  },
  {
    title: "视频创作",
    description:
      "短片、品牌影像和纪录风格作品。从前期概念到最终剪辑，注重节奏与质感。",
  },
  {
    title: "调色",
    description:
      "专业 DaVinci Resolve 调色服务，覆盖电影、广告和数字内容。自建节点树和胶片模拟 LUT。",
  },
  {
    title: "视觉指导",
    description:
      "端到端的视觉策略。包括情绪板、艺术指导和后期监制，为注重影像品质的品牌服务。",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <AnimatedSection className="px-6 md:px-12 mb-24">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] font-light tracking-[0.35em] text-white/40 uppercase mb-4">
            关于我
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-thin tracking-tight text-white mb-6 leading-[1.1]">
                我拍下的每一帧
                <br />
                <span className="text-white/40">都像一段记忆。</span>
              </h1>
            </div>
            <div className="space-y-6">
              <p className="text-base sm:text-lg font-light leading-relaxed text-white/50">
                从一台 Leica Q2 和一个简单的信念开始——最好的画面不是最锐利、参数最完美的，而是能让你感受到某种无法言说的东西。
              </p>
              <p className="text-base sm:text-lg font-light leading-relaxed text-white/50">
                这个信念带我走过凌晨两点的重庆霓虹雨街，也带我到过北海道清晨的白雪之路。从二十人团队的商业片场，到独自驾车穿越新疆沙漠——唯一见证完美日落的是我的相机。
              </p>
              <p className="text-base sm:text-lg font-light leading-relaxed text-white/35">
                我横跨摄影、视频和调色三个领域，不是因为无法抉择，而是因为每一种媒介都能教会我其他媒介无法传达的东西。光线在每秒 24 帧中的表现与在 1/500 秒快门下的表现截然不同。色彩在 30 秒广告中的意义与在单帧画面中完全不同。理解这三者，让我的每一项都做得更好。
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 md:px-12 mb-24" delay={0.1}>
        <div className="max-w-[1400px] mx-auto border-t border-white/[0.04] pt-24">
          <div className="max-w-3xl">
            <p className="text-[11px] font-light tracking-[0.35em] text-white/40 uppercase mb-10">
              创作理念
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-light leading-relaxed text-white/60">
              每一帧都是对光的研习。相机只是工具，真正的功夫在于学会看见——留意午后阳光如何绕过肩膀的弧线，雾气如何软化天际线，霓虹亮起时阴影落在哪里。最好的画面不是拍出来的，而是等出来的。
            </p>
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 md:px-12 mb-24" delay={0.15}>
        <div className="max-w-[1400px] mx-auto border-t border-white/[0.04] pt-24">
          <p className="text-[11px] font-light tracking-[0.35em] text-white/40 uppercase mb-12">
            服务范围
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {services.map((s) => (
              <div key={s.title}>
                <h3 className="text-lg font-light tracking-[0.06em] text-white/85">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm font-light text-white/30 leading-relaxed max-w-sm">
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 md:px-12 mb-24" delay={0.2}>
        <div className="max-w-[1400px] mx-auto border-t border-white/[0.04] pt-24">
          <p className="text-[11px] font-light tracking-[0.35em] text-white/40 uppercase mb-12">
            合作品牌与机构
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {[
              "生活方式品牌 · 杭州",
              "文化遗产保护机构 · 北京",
              "街头服饰品牌 · 上海",
              "小众香水品牌 · 巴黎",
              "陶瓷工作室 · 景德镇",
              "现代舞团 · 广州",
              "旅行杂志 · 东京",
            ].map((client) => (
              <span
                key={client}
                className="text-sm font-light text-white/25 leading-relaxed"
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="px-6 md:px-12" delay={0.25}>
        <div className="max-w-[1400px] mx-auto border-t border-white/[0.04] pt-24">
          <p className="text-[11px] font-light tracking-[0.35em] text-white/40 uppercase mb-6">
            我的器材
          </p>
          <p className="text-base font-light text-white/30 max-w-xl mb-8">
            Sony FX3、A7S III、Leica Q2。一套大光圈定焦镜头。几盏灯。DaVinci Resolve 负责色彩。
            工具很简单——因为决定画面的始终是眼光，不是器材。
          </p>
          <a
            href="/gear"
            className="inline-flex items-center gap-2 text-[13px] font-light tracking-[0.18em] text-white/40 hover:text-white/60 transition-colors duration-500 uppercase group"
          >
            查看全部器材
            <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">
              &rarr;
            </span>
          </a>
        </div>
      </AnimatedSection>
    </div>
  );
}
