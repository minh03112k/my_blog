import { defineConfig, lazyPlugins } from 'vite-plus'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  lint: {
    plugins: ['react', 'typescript', 'oxc', 'jsx-a11y', 'import', 'unicorn'],
    rules: {
      'react/rules-of-hooks': 'error',
      'react/only-export-components': [
        'error',
        {
          allowConstantExport: true,
        },
      ],
      'react/exhaustive-deps': 'error',
      'typescript/no-explicit-any': 'error',
      'typescript/no-non-null-assertion': 'error',
      'typescript/consistent-type-imports': 'error',
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'import/no-duplicates': 'error',
      'vite-plus/prefer-vite-plus-imports': 'error',
    },
    categories: {
      correctness: 'error',
    },
    ignorePatterns: ['dist/**', 'dist-ssr/**', 'coverage/**'],
    options: {
      typeAware: true,
      typeCheck: true,
      denyWarnings: true,
      reportUnusedDisableDirectives: 'error',
    },
    jsPlugins: [
      {
        name: 'vite-plus',
        specifier: 'vite-plus/oxlint-plugin',
      },
    ],
  },
  fmt: {
    semi: false,
    singleQuote: true,
    trailingComma: 'all',
    endOfLine: 'lf',
    printWidth: 80,
    sortPackageJson: false,
    ignorePatterns: [
      'node_modules/',
      'dist/',
      'dist-ssr/',
      'coverage/',
      'pnpm-lock.yaml',
      'src/content/**/*.md',
    ],
  },
  base: './',
  plugins: lazyPlugins(() => [react(), tailwindcss()]) ?? [],
})
