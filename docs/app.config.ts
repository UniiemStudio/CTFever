export default defineAppConfig({
  docus: {
    title: 'CTFever',
    description: 'A fantastic toolkit for CTFers and everyone',
    image: 'https://user-images.githubusercontent.com/904724/185365452-87b7ca7b-6030-4813-a2db-5e65c785bf88.png',
    socials: {
      github: 'UniiemStudio/CTFever'
    },
    github: {
      dir: 'docs/content',
      branch: 'main',
      repo: 'CTFever',
      owner: 'UniiemStudio',
      edit: true
    },
    aside: {
      level: 1,
      collapsed: false,
      exclude: []
    },
    main: {
      padded: true,
      fluid: true
    },
    header: {
      logo: true,
      showLinkIcon: true,
      exclude: [],
      fluid: true
    }
  }
})
