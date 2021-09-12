import GitHubStore from "../store/GitHubStore/GitHubStore";

const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = "adobe";

gitHubStore.getOrganizationRepoBranches({
  organizationName: EXAMPLE_ORGANIZATION,
  repoName: "brackets-app"
}).then(result => {
  console.log(result);
});