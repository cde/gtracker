import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

import './Tool.css';

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

class PopularTools extends Component {


    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    }

    render() {
        const { errors } = this.state;
        //TODO: bring data from model PopularTools
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
            <div className="popular-tools ">
                <a title={tool.name} className="popular-tools tool" onClick={this.onClick}>
                    <img src={tool.image} className="link-image logo" alt={tool.name} />
                </a>
            </div>
        ));
        return (

            <Container className="profile add-experience" >
                <Row>
                    <Col md={6} className="d-flex flex-row ">
                        { popularToolsLogos }
                    </Col>
                </Row>

            </Container>
        );
    }
}

export default PopularTools;