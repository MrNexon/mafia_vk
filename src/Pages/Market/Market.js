import React, {Component} from 'react';
import {Panel, PanelHeader, View, Placeholder} from "@vkontakte/vkui";
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import Icon28EmployeeOutline from '@vkontakte/icons/dist/28/employee_outline';

class Market extends Component {
    render() {
        return (
            <View id="market" activePanel="market">
                <Panel id="market">
                    <PanelHeader>Магазин</PanelHeader>
                    <Placeholder
                        icon={<Icon28EmployeeOutline width={56} height={56}/>}
                        header={<p>Бжж бжж тр тр тр вжжжжжж<br/>*звуки строительства*</p>}>

                        Магазин закрылся на ремонт, приходите позже
                    </Placeholder>
                </Panel>
            </View>
        );
    }
}

export default Market;