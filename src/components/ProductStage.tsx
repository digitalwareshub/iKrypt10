/**
 * Decorative, non-interactive product illustration used on the homepage.
 * The real, accessible encryption form is directly beneath the hero.
 * Do not put sample secrets or user data in this preview.
 */
export default function ProductStage() {
  return (
    <div className="ikrypt-product-stage" aria-hidden="true">
      <div className="ikrypt-product-window">
        <div className="ikrypt-product-toolbar">
          <div className="flex items-center gap-2.5">
            <span className="flex gap-1.5"><i /><i /><i /></span>
            <span className="ml-4 font-semibold tracking-tight text-[#E9E9EF]">iKrypt</span>
            <span className="text-[#666875]">/</span>
            <span className="text-[#B2B3C0]">Secure sharing</span>
          </div>
          <div className="flex items-center gap-5 text-[#90919E]">
            <span>Browser encryption</span>
            <span className="rounded-md border border-[#303037] px-3 py-1.5 text-[#D0D0D8]">No account needed</span>
          </div>
        </div>
        <div className="ikrypt-product-body">
          <aside className="ikrypt-product-sidebar">
            <div className="mb-9 text-xs font-medium uppercase tracking-[0.16em] text-[#9393A6]">Workspace</div>
            <div className="rounded-lg bg-[#25262D] px-4 py-3 text-[#F3F3F5]">◇ &nbsp; Create a secret</div>
            <div className="px-4 py-3 text-[#9B9CA9]">⌁ &nbsp; How it works</div>
            <div className="px-4 py-3 text-[#9B9CA9]">⌗ &nbsp; Security</div>
            <div className="mt-12 border-t border-[#2C2D33] pt-6 text-xs leading-6 text-[#9393A6]">
              Browser-based encryption<br />Public source · No sign-up
            </div>
          </aside>
          <div className="ikrypt-product-main">
            <div className="mb-8 flex items-center justify-between border-b border-[#2B2C32] pb-6">
              <div>
                <div className="text-xs uppercase tracking-[0.16em] text-[#878995]">New encrypted link</div>
                <div className="mt-3 text-[34px] font-semibold tracking-[-0.05em] text-[#F5F5F7]">Share something private.</div>
              </div>
              <span className="rounded-full border border-[#414452] bg-[#222430] px-4 py-2 text-xs text-[#BBC5FF]">● &nbsp; Local encryption</span>
            </div>
            <div className="grid gap-7 lg:grid-cols-[1.3fr_0.8fr]">
              <div>
                <div className="mb-3 text-sm font-medium text-[#D2D3DA]">Your secret</div>
                <div className="h-[210px] rounded-xl border border-[#363740] bg-[#101115] p-6">
                  <div className="mb-5 h-2 w-[48%] rounded-full bg-[#393B46]" />
                  <div className="mb-4 h-2 w-[76%] rounded-full bg-[#2A2C35]" />
                  <div className="mb-4 h-2 w-[58%] rounded-full bg-[#2A2C35]" />
                  <div className="h-2 w-[35%] rounded-full bg-[#2A2C35]" />
                </div>
                <div className="mt-5 inline-flex rounded-lg bg-[#F2F2F4] px-7 py-3.5 text-sm font-semibold text-[#17171B]">Encrypt and create link &nbsp; ↗</div>
              </div>
              <div>
                <div className="mb-3 text-sm font-medium text-[#D2D3DA]">Link settings</div>
                <div className="rounded-xl border border-[#363740] bg-[#17181E] p-5">
                  <div className="text-xs text-[#8D8F9D]">Expires after</div>
                  <div className="mt-3 flex gap-2 text-xs"><span className="rounded-md border border-[#3A3B45] px-3 py-2 text-[#A2A4B2]">10 min</span><span className="rounded-md border border-[#3A3B45] px-3 py-2 text-[#A2A4B2]">1 hour</span><span className="rounded-md bg-[#39405F] px-3 py-2 text-[#EDF0FF]">24 hours</span></div>
                  <div className="mt-8 text-xs text-[#8D8F9D]">Allowed views</div>
                  <div className="mt-3 flex gap-2 text-xs"><span className="rounded-md bg-[#39405F] px-4 py-2 text-[#EDF0FF]">Once</span><span className="rounded-md border border-[#3A3B45] px-4 py-2 text-[#A2A4B2]">3 times</span><span className="rounded-md border border-[#3A3B45] px-4 py-2 text-[#A2A4B2]">5 times</span></div>
                  <div className="mt-8 border-t border-[#35353E] pt-5 text-xs text-[#A6A8B5]">✓ &nbsp; Key stays in your browser</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
