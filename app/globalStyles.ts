import { Theme } from './theme'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle<{ theme: Theme }>`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: var(--font-montserrat), sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    /* padding: ${({ theme }) => theme.spacing['8xl']}; */

    @media (max-width: 768px) {
      padding: ${({ theme }) => theme.spacing['7xl']} ${({ theme }) => theme.spacing.xxl};
    }
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1 {
    font-size: ${({ theme }) => theme.typography.h1.fontSize};
    line-height: ${({ theme }) => theme.typography.h1.lineHeight};
    font-weight: ${({ theme }) => theme.typography.h1.fontWeight};
    letter-spacing: ${({ theme }) => theme.typography.h1.letterSpacing};
  }

  h2 {
    font-size: ${({ theme }) => theme.typography.h2.fontSize};
    line-height: ${({ theme }) => theme.typography.h2.lineHeight};
    font-weight: ${({ theme }) => theme.typography.h2.fontWeight};
    letter-spacing: ${({ theme }) => theme.typography.h2.letterSpacing};
  }

  h3 {
    font-size: ${({ theme }) => theme.typography.h3.fontSize};
    line-height: ${({ theme }) => theme.typography.h3.lineHeight};
    font-weight: ${({ theme }) => theme.typography.h3.fontWeight};
    letter-spacing: ${({ theme }) => theme.typography.h3.letterSpacing};
  }

  h4 {
    font-size: ${({ theme }) => theme.typography.h4.fontSize};
    line-height: ${({ theme }) => theme.typography.h4.lineHeight};
    font-weight: ${({ theme }) => theme.typography.h4.fontWeight};
    letter-spacing: ${({ theme }) => theme.typography.h4.letterSpacing};
  }

  h5 {
    font-size: ${({ theme }) => theme.typography.h5.fontSize};
    line-height: ${({ theme }) => theme.typography.h5.lineHeight};
    font-weight: ${({ theme }) => theme.typography.h5.fontWeight};
    letter-spacing: ${({ theme }) => theme.typography.h5.letterSpacing};
  }
`