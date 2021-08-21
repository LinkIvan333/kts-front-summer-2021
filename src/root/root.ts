import GitHubStore from '../store/GitHubStore/GitHubStore';
const gitHubStore = new GitHubStore();

const EXAMPLE_ORGANIZATION = 'ktsstudio';

export default class Main {
    Main() {
        gitHubStore.getOrganizationReposList({
            organizationName: EXAMPLE_ORGANIZATION
        }).then(result => {
            console.log(result); // в консоли появится список репозиториев в ktsstudio
        })
    }
}