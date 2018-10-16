import React from "react";
import IssueApi from "./IssueApi";

// const LIMIT = 25;

class IssueSearch extends React.Component {


    constructor() {
        super();
        this.state = {
            data: [],
            issues: [],
            direction: null,
            column: null,
        }
    }

    handleSort = clickedColumn => () => {
        const { column, issues, direction } = this.state

        if (column !== clickedColumn) {

            /**
             * TODO: Change sort (vanilla)
             */
            this.setState({
                column: clickedColumn,
                issues: issues.sort((a, b) => {

                    if (a[clickedColumn] > b[clickedColumn]) {
                        return 1;
                    }
                    if (a[clickedColumn] < b[clickedColumn]) {
                        return -1;
                    }

                    return 0;

                }),
                direction: 'ascending sorted',
            })

            return
        }

        this.setState({
            issues: issues.reverse(),
            direction: direction === 'ascending sorted' ? 'descending sorted' : 'ascending sorted',
        })
    }

    async componentDidMount() {
        const issues = await IssueApi.search();
        this.setState({
            issues,
            data: issues
        });
    }

    handleSearchChange = e => {

        let { data } = this.state
        const value = e.target.value;

        const newIssues = data.filter(cur => {
            const reg = new RegExp('^(' + value + ')', 'i');
            const match = cur.number.toString().match(reg);
            return match && match.length > 1;
        });

        this.setState({
            issues: newIssues
        });


    };


    render() {

        const { issues } = this.state;

        const labelRows = (labels) => labels.map((cur, index) => <div className='ui tag label' key={index} style={{ backgroundColor: '#' + cur.color }} >{cur.name}</div>)

        const stateColor = (state) => {
            let bg = '';
            switch (state) {
                case 'close':
                    bg = 'red';
                    break;
                default:
                    bg = 'teal';
                    break;

            }
            return bg;
        }

        const formatDate = (date) => new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: '2-digit', hour: 'numeric', minute: 'numeric' }).format(new Date(date));

        let issueRows = issues.map((issue, idx) => (
            <tr key={idx} onClick={() => this.props.onIssueClick(issue)}>
                <td>{issue.number}</td>
                <td>{issue.title}</td>
                <td>{formatDate(issue.created_at)}</td>
                <td>{formatDate(issue.updated_at)}</td>
                <td>{labelRows(issue.labels)}</td>
                <td>
                    <div className='ui right ribbon label' style={{ background: stateColor(issue.state) }} >{issue.state}</div>
                </td>
            </tr>
        ));

        if (!issueRows.length) {
            issueRows = <tr key='fail'>
                            <td colSpan="6">
                                <h3 class="ui center aligned header"> Not found</h3>
                            </td>
                        </tr>
        }

        return (
            <div id="issue-search">
                <table className="ui celled sortable table">
                    <thead>
                        <tr>
                            <th colSpan="6">
                                <div className="ui fluid search">
                                    <div className="ui icon input">
                                        <input
                                            className="prompt"
                                            type="text"
                                            placeholder="Search number issues..."
                                            onChange={this.handleSearchChange}
                                        />
                                        <i className="search icon" />
                                    </div>
                                </div>
                            </th>
                        </tr>
                        <tr>
                            <th className={this.state.column === 'number' ? this.state.direction : null} onClick={this.handleSort('number')}>Issue Number</th>
                            <th>Title</th>
                            <th className={this.state.column === 'created_at' ? this.state.direction : null} onClick={this.handleSort('created_at')}>Created At</th>
                            <th className={this.state.column === 'updated_at' ? this.state.direction : null} onClick={this.handleSort('updated_at')}>Updated At</th>
                            <th>Labels</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {issueRows}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default IssueSearch;