import { ImageResponse } from 'next/og';

export const alt = 'KrillionPro – Daily Games, Trivia & Fun Challenges Online';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 72px',
          background:
            'radial-gradient(circle at 80% 20%, rgba(34, 211, 238, 0.2) 0%, transparent 45%), linear-gradient(160deg, #040B16 0%, #091830 55%, #0B2547 100%)',
          color: '#F8FAFC',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: '2px solid #22D3EE',
              backgroundColor: 'rgba(34, 211, 238, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#22D3EE',
              fontSize: 24,
              fontWeight: 700,
            }}
          >
            K
          </div>
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#F8FAFC',
            }}
          >
            KrillionPro
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
            }}
          >
            Think Different. Play Smarter.
          </div>
          <div
            style={{
              fontSize: 26,
              lineHeight: 1.45,
              color: '#CBD5E1',
              maxWidth: '860px',
            }}
          >
            Daily games, trivia, guessing challenges, and brain games crafted to test your knowledge and instincts every day.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(56, 189, 248, 0.25)',
            paddingTop: '24px',
            fontSize: 20,
            color: '#38BDF8',
          }}
        >
          <span>Daily Challenges · Unlimited Games · Themed Modes</span>
          <span>krillionpro.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
