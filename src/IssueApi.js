const search = async () => {

    try {
        const response = await fetch(`https://api.github.com/repos/facebook/react/issues`);
        const json = await response.json();
        return json;
      } catch (error) {
        console.log(error);
      }

}

const IssueApi = { search };
export default IssueApi;