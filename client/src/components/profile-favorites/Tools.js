import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container, Row, Col, Button } from 'reactstrap';

import FormGroupField from './../form/FormGroupField';
import FormGroupTextAreaField from "../form/FormGroupTextAreaField";
import Breadcrumbs from "../common/Breadcrumbs";

import { addTools } from '../../actions/profileUserActions';

import './Tool.css';

//
import javascriptLogo from '../../img/javascript.jpeg';
import reactLogo from '../../img/react.png';
import reduxLogo from '../../img/redux.png';
import githubLogo from '../../img/github.png';
import androidLogo from '../../img/android.png';
import nodeLogo from '../../img/nodejs.png';
import javaLogo from '../../img/java.png';
import rubyLogo from '../../img/ruby.png';
import dockerLogo from '../../img/docker.png';
import herokuLogo from '../../img/heroku.png';
import postgresLogo from '../../img/postgresql.png';
import mysqlLogo from '../../img/mysql.png';
import azureLogo from '../../img/azure.png';
import amazonDynamodbLogo from '../../img/amazon-dynamodb.png';
import amazonec2Logo from '../../img/amazon-ec2.png';
import jiraLogo from '../../img/jira.png';
import html5Logo from '../../img/html5.png';


class Tools extends Component {

    state = {
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: '',
        errors: {},
        disabled: false
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    onSubmit =(e) => {
        e.preventDefault();

        const toolData = {
            name: this.state.name,
            url: this.state.url,
            description: this.state.description,
            image: this.state.image
        };

        this.props.addTools(toolData, this.props.history);
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    onClickTool(tool) {
        console.log(tool)

        this.setState({
            name: tool.name,
            url: tool.url,
            image: tool.image
        })

    }

    // onCheck =(e)=> {
    //     this.setState({
    //         disabled: !this.state.disabled,
    //         current: !this.state.current
    //     });
    // }

    render() {
        const { errors } = this.state;
        const popularTools = [
            { id: '0', image: dockerLogo, name: 'Docker', platform: 'DevOps', url: 'https://www.docker.com/' },
            { id: '1', image: javascriptLogo, name: 'Javascript', platform: 'frontend', url: 'https://www.javascript.com/' },
            { id: '2', image: reactLogo, name: 'React', platform: 'frontend', url: 'https://reactjs.org/' },
            { id: '3', image: reduxLogo, name: 'Redux', platform: 'frontend', url: 'https://www.javascript.com/' },
            { id: '4', image: githubLogo, name: 'GitHub', platform: 'DevOps', url: 'https://github.com/' },
            { id: '5',image: rubyLogo, name: 'Ruby', platform: 'backend', url: 'https://www.ruby-lang.org/en/' },
            { id: '6',image: androidLogo, name: 'Android', platform: 'mobile', url: 'https://www.android.com/' },
            { id: '7',image: javaLogo, name: 'Java', platform: 'backend', url: 'https://java.com/en/'},
            { id: '8',image: nodeLogo, name: 'NodeJs', platform: 'backend', url: 'https://nodejs.org/en/'},
            { id: '9',image: herokuLogo, name: 'Heroku', platform: 'DevOps', url: 'https://www.javascript.com/' },
            { id: '10',image: postgresLogo, name: 'Postgres', platform: 'DevOps', url: 'https://www.postgresql.org/' },
            { id: '11',image: mysqlLogo, name: 'MySQL', platform: 'backend', url: 'https://www.postgresql.org/' },
            { id: '12',image: azureLogo, name: 'Azure', platform: 'backend', url: 'https://azure.microsoft.com' },
            { id: '13',image: amazonDynamodbLogo, name: 'Amazon Dynamodb', platform: 'backend', url: 'https://aws.amazon.com/dynamodb/' },
            { id: '14',image: amazonec2Logo, name: 'Amazon Dynamodb', platform: 'backend', url: 'https://aws.amazon.com/ec2/' },
            { id: '15',image: jiraLogo, name: 'Jira Software', platform: 'utils', url: 'https://www.atlassian.com/' },
            { id: '16',image: html5Logo, name: 'Html5', platform: 'utils', url: 'https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5' }


        ];

        const popularToolsLogos = popularTools.map(tool => (
            <div className="popular-tools" key={tool.id}>
                <a title={tool.name} className="popular-tools tool" onClick={this.onClickTool.bind(this, tool)}>
                    <img src={tool.image} className="link-image logo" alt={tool.name} />
                </a>
            </div>
        ));

        return (
            <Container className="profile add-experience" >
                <Breadcrumbs goBack="Go Back" current="Tool" />

                <Row>
                    <Col md={8} className="m-auto">

                        <h1 className="display-5 text-center dark-medium-orange">Share with us your favorite tools</h1>
                        <div className="lead text-center text-muted">
                            Add any tool you are currently using or would love to explore!!
                        </div>
                        <Container className="mt-3">
                            <h3 className="text-info" color="light">Popular Tools</h3>
                            <Row >
                                <Col md={6} className="d-flex flex-row">
                                    {popularToolsLogos}
                                </Col>
                            </Row>
                            <small className="text-muted">Click any logo to add your favorite tool or surprise us with a new one!!!</small>
                        </Container>
                        <form onSubmit={this.onSubmit}>
                            <FormGroupField
                                placeholder="* Name"
                                name="company"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                error={errors.name}
                            />
                            <FormGroupField
                                placeholder="* Website"
                                name="url"
                                value={this.state.url}
                                onChange={this.handleInputChange}
                                error={errors.url}
                                info="Provide a website where we can find more info about your favorite tool"
                            />
                            <FormGroupTextAreaField
                                placeholder="Tool Description"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                error={errors.description}
                                info="Tell us why you like this tool / language / tech stack"
                            />
                            <br/>
                            <small className="d-block pb-3">* = required fields</small>

                            <Button type="submit" className="btn btn-lg btn-info-orange btn-block mt-4">Submit</Button>
                        </form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

Tools.propTypes = {
    addTools: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { addTools })(
    withRouter(Tools)
);
