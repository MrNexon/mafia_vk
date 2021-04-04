import classNames from 'classnames';
import React, { Component, EventHandler } from 'react';

interface IProps {
	namespace: string;
	animation?: 'in' | 'out' | null;
	onStart?: EventHandler<any>;
	onEnd?: EventHandler<any>;
}

interface IState {
	lastAnimation: 'in' | 'out' | null | undefined;
	animationState: boolean;
}

class Animator extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);

		this.state = {
			lastAnimation: null,
			animationState: false,
		};

		this.onAnimationEnd = this.onAnimationEnd.bind(this);
		this.onAnimationStart = this.onAnimationStart.bind(this);
		this.buildStyle = this.buildStyle.bind(this);
		this.componentDidUpdate = this.componentDidUpdate.bind(this);
	}

	componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>) {
		if (!prevState.animationState)
			this.setState({
				animationState: true,
			});
	}

	buildStyle(): string | undefined {
		let className;
		switch (this.state.lastAnimation) {
			case null:
			case 'out':
				className = `${this.props.namespace}-in`;
				break;
			case 'in':
				className = `${this.props.namespace}-out`;
				break;
		}

		if (this.props.animation && this.state.animationState)
			return classNames(
				className,
				`${this.props.namespace}-${this.props.animation}-enter`,
			);
		return className;
	}

	onAnimationEnd(event: any) {
		this.setState({
			animationState: false,
			lastAnimation: this.props.animation,
		});
		if (this.props.onEnd) this.props.onEnd(event);
	}

	onAnimationStart(event: any) {
		this.setState({
			animationState: true,
		});
		if (this.props.onStart) this.props.onStart(event);
	}

	renderChildren() {
		return React.Children.map(this.props.children, (child) => {
			// @ts-ignore
			return React.cloneElement(child, {
				className: this.buildStyle(),
			});
		});
	}

	render() {
		console.log('Render');
		return (
			<div onAnimationStart={this.onAnimationStart} onAnimationEnd={this.onAnimationEnd}>
				{this.renderChildren()}
			</div>
		);
	}
}

export default Animator;
