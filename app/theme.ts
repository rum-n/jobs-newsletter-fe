export const theme = {
    colors: {
        primary: '#2BD17E',
        secondary: '#2BD17E',
        error: '#EB5757',
        background: '#093545',
        input: '#224957',
        card: '#092C39',
        white: '#FFFFFF',
    },
    typography: {
        h1: {
            fontSize: '64px',
            lineHeight: '80px',
            fontWeight: 600,
            letterSpacing: '0',
        },
        h2: {
            fontSize: '48px',
            lineHeight: '56px',
            fontWeight: 600,
            letterSpacing: '0',
        },
        h3: {
            fontSize: '32px',
            lineHeight: '40px',
            fontWeight: 600,
            letterSpacing: '0',
        },
        h4: {
            fontSize: '24px',
            lineHeight: '32px',
            fontWeight: 700,
            letterSpacing: '0',
        },
        h5: {
            fontSize: '20px',
            lineHeight: '24px',
            fontWeight: 700,
            letterSpacing: '0',
        },
        p: {
            fontSize: '20px',
            lineHeight: '32px',
            fontWeight: 500,
            letterSpacing: '0',
        },
    },
    spacing: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        xxl: '24px',
        xxxl: '32px',
        '4xl': '40px',
        '5xl': '48px',
        '6xl': '64px',
        '7xl': '80px',
        '8xl': '120px',
        '9xl': '160px',
    },
    breakpoints: {
        mobile: '320px',
        tablet: '768px',
        desktop: '1024px',
    }
}

export type Theme = typeof theme