declare namespace NodeJS {
  export interface Global {
    matchMedia: (
      media: any
    ) => {
      media: any
      matches: boolean
      addListener: (listener: any) => any
      removeListener: (listener: any) => void
      onchange: () => any
    }
  }
}
