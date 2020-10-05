import React, {Component} from 'react';
import './RoleUserCard.scss';

class RoleUserCard extends Component {
    render() {
        return (
            <div className={"RoleUserCard" + (this.props.expand ? " RoleUserCard_expand" : "")}>
                <div className="RoleUserCard-Wrapper">
                    <div className="RoleUserCard-AvatarImage" style={{
                        backgroundImage: 'url(' + this.props.user.avatar + ')'
                    }}/>
                    <div className="RoleUserCard-CardContentWrapper">
                        <div className="RoleUserCard-CardContent">
                            <div className="CardContent-Role">{this.props.role.local_name}</div>
                            <div className="CardContent-Name">{this.props.user.first_name + " " + this.props.user.last_name}</div>
                        </div>
                        <div className="RoleUserCard-RoleImage" style={{
                            backgroundImage: 'url(' + this.props.role.image + ')'
                        }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default RoleUserCard;