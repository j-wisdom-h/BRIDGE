import type { Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
    // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
    dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
    rootDir: './',
    coverageProvider: 'v8',
    testEnvironment: 'jest-environment-jsdom',
    // testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    // transformIgnorePatterns: [
    //     '/node_modules/',
    //     '^.+\\.module\\.(css|sass|scss)$',
    // ],
    transform: {
        '^.+\\.(js|jsx|mjs)$': 'babel-jest',
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    moduleNameMapper: {
        '^@/components/(.*)$': '<rootDir>/app/$1',
        '^@/_interfaces/(.*)$': '<rootDir>/app/$1',
        '^@/_lib/(.*)$': '<rootDir>/app/$1',
        '^@/utils/(.*)$': '<rootDir>/app/$1',
    },
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
