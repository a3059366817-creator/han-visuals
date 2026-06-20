"use client";

import Link from "next/link";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { siteConfig } from "@/data/site-config";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24">
      <AnimatedSection className="px-6 md:px-12 mb-16">
        <div className="max-w-[1400px] mx-auto">
          <p className="text-[11px] font-light tracking-[0.35em] text-white/40 uppercase mb-4">
            联系我
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-thin tracking-tight text-white">
            一起创作
          </h1>
          <p className="mt-6 text-base sm:text-lg font-light text-white/30 max-w-xl">
            有项目想聊聊？我很乐意听听。填写下方表单或直接联系我。
          </p>
        </div>
      </AnimatedSection>

      <div className="px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16">
          <AnimatedSection delay={0.1}>
            <form className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[11px] font-light tracking-[0.15em] text-white/40 uppercase mb-2">
                    姓名
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-white/[0.08] py-3 text-sm font-light text-white/80 placeholder-white/15 focus:outline-none focus:border-white/25 transition-colors duration-300"
                    placeholder="你的名字"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-light tracking-[0.15em] text-white/40 uppercase mb-2">
                    邮箱
                  </label>
                  <input
                    type="email"
                    className="w-full bg-transparent border-b border-white/[0.08] py-3 text-sm font-light text-white/80 placeholder-white/15 focus:outline-none focus:border-white/25 transition-colors duration-300"
                    placeholder="你的邮箱"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-light tracking-[0.15em] text-white/40 uppercase mb-2">
                  项目类型
                </label>
                <select
                  className="w-full bg-transparent border-b border-white/[0.08] py-3 text-sm font-light text-white/50 focus:outline-none focus:border-white/25 transition-colors duration-300"
                  defaultValue=""
                >
                  <option value="" disabled className="bg-neutral-950">
                    请选择项目类型
                  </option>
                  <option value="photo" className="bg-neutral-950">摄影</option>
                  <option value="video" className="bg-neutral-950">视频创作</option>
                  <option value="grading" className="bg-neutral-950">调色</option>
                  <option value="direction" className="bg-neutral-950">创意指导</option>
                  <option value="other" className="bg-neutral-950">其他</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-light tracking-[0.15em] text-white/40 uppercase mb-2">
                  留言
                </label>
                <textarea
                  rows={5}
                  className="w-full bg-transparent border-b border-white/[0.08] py-3 text-sm font-light text-white/80 placeholder-white/15 focus:outline-none focus:border-white/25 transition-colors duration-300 resize-none"
                  placeholder="说说你的项目..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-8 py-3 border border-white/[0.12] text-sm font-light tracking-[0.15em] text-white/70 hover:text-white hover:border-white/25 transition-all duration-500 uppercase"
              >
                发送留言
              </button>
            </form>
          </AnimatedSection>

          <AnimatedSection delay={0.2}>
            <div className="space-y-10 lg:pt-2">
              <div>
                <p className="text-[11px] font-light tracking-[0.15em] text-white/40 uppercase mb-4">
                  邮箱
                </p>
                <Link
                  href={`mailto:${siteConfig.socials.email}`}
                  className="text-sm font-light text-white/60 hover:text-white/85 transition-colors duration-300"
                >
                  {siteConfig.socials.email}
                </Link>
              </div>

              <div>
                <p className="text-[11px] font-light tracking-[0.15em] text-white/40 uppercase mb-4">
                  社交平台
                </p>
                <div className="space-y-3">
                  <Link
                    href={siteConfig.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-light text-white/40 hover:text-white/65 transition-colors duration-300"
                  >
                    Instagram
                  </Link>
                  <Link
                    href={siteConfig.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-light text-white/40 hover:text-white/65 transition-colors duration-300"
                  >
                    YouTube
                  </Link>
                  <Link
                    href={`https://xiaohongshu.com/${siteConfig.socials.xiaohongshu}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-light text-white/40 hover:text-white/65 transition-colors duration-300"
                  >
                    小红书
                  </Link>
                </div>
              </div>

              <div>
                <p className="text-[11px] font-light tracking-[0.15em] text-white/40 uppercase mb-4">
                  所在地
                </p>
                <p className="text-sm font-light text-white/40">
                  中国
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
