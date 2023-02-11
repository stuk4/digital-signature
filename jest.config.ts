export default {
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.tsx?$":['ts-jest', { tsconfig: 'tsconfig.test.json' }],
    },
    fakeTimers: {"enableGlobally": true},
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"]
}