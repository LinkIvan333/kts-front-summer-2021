export const MAIN_CONST = {
  PLACEHOLDER: "Введите название организации",
  SIDE_NAME_REPO: "Список веток репозитория"
};

export const ROUTES = {
  repos: {
    mask: "/repos",
    create: (id:number | string): string => `/repos/${id}`
  }
};

export const ENDPOINTS = {
  gitBranchesApi: {
    mask: "repositories/",
    create: (id: string): string => `repositories/${id}/branches`
  },
  gitRepoListApi: {
    mask: "orgs/",
    create: (organizationName: string): string => `orgs/${organizationName}/repos`
  }
}