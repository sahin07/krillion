import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #060F1E 0%, #0E294D 100%)',
          borderRadius: 8,
          border: '2px solid #22D3EE',
          color: '#22D3EE',
          fontSize: 18,
          fontWeight: 700,
          fontFamily: 'sans-serif',
        }}
      >
        K
      </div>
    ),
    {
      ...size,
    }
  );
}
