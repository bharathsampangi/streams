import React, { Component } from 'react';
import Modal from '../Modal';
import history from '../../history';
import { Link } from 'react-router-dom';
import { fetchStream, deleteStream } from '../../actions';
import { connect } from 'react-redux';

class StreamDelete extends Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }
    onDelete() {
        const { id } = this.props.match.params;
        this.props.deleteStream(id);
    }
    renderActions() {
        return (
            <React.Fragment>
                <button className="ui button negative" onClick={() => this.onDelete()}>Delete</button>
                <Link className="ui button" to="/">Cancel</Link>
            </React.Fragment>
        )
    }
    renderContent() {
        if (!this.props.stream) {
            return (
                'Are you sure you want to delete this stream?'
            )
        } else {
            return `Are you sure you want to delete this stream with title: ${this.props.stream.title}`
        }
    }
    render() {
        return (
            <Modal
                title="Delete Stream"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        )
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(mapStateToProps, {
    fetchStream,
    deleteStream
})(StreamDelete);