import React, {Component} from 'react';
import {
    Epic,
    Tabbar,
    TabbarItem,
    View,
    Panel,
    PanelHeader,
    PanelHeaderBack,
    PanelHeaderContent,
    Avatar,
    Group, Root
} from "@vkontakte/vkui";

import Icon28Play from '@vkontakte/icons/dist/28/play';
import Icon28MarketOutline from '@vkontakte/icons/dist/28/market_outline';
import Icon28GlobeOutline from '@vkontakte/icons/dist/28/globe_outline';
import Icon56Users3Outline from '@vkontakte/icons/dist/56/users_3_outline';

import './NewHome.scss';

import Market from "../Market/Market";
import NewsCard from "../../Controll/NewsCard/NewsCard";
import CardGrid from "@vkontakte/vkui/dist/components/CardGrid/CardGrid";
import Header from "../../Controll/Typography/Header/Header";
import StatisticsCard from "../../Controll/StatisticsCard/StatisticsCard";

import CardRow from "../../Controll/CardRow/CardRow";
import Icon28GhostOutline from "@vkontakte/icons/dist/28/ghost_outline";
import Icon28TargetOutline from '@vkontakte/icons/dist/28/target_outline';
import Icon28UserOutline from '@vkontakte/icons/dist/28/user_outline';
import Icon28SmileOutline from '@vkontakte/icons/dist/28/smile_outline';
import Icon28CheckCircleOutline from '@vkontakte/icons/dist/28/check_circle_outline';
import Icon28VideoOutline from '@vkontakte/icons/dist/28/video_outline';
import BigButton from "../../Controll/Button/BigButton/BigButton";

import Icon28GameOutline from '@vkontakte/icons/dist/28/game_outline';
import Icon28ArticleOutline from '@vkontakte/icons/dist/28/article_outline';
import SimpleCell from "@vkontakte/vkui/dist/components/SimpleCell/SimpleCell";
import Placeholder from "@vkontakte/vkui/dist/components/Placeholder/Placeholder";

import Icon28BlockOutline from '@vkontakte/icons/dist/28/block_outline';

import API from "../../API/API";

class NewHome extends Component {
    constructor (props) {
        super(props);

        this.state = {
            activeStory: 'home',
            activeView: 'home'
        };
        this.onStoryChange = this.onStoryChange.bind(this);

    }

    onStoryChange (e) {
        this.setState({ activeStory: e.currentTarget.dataset.story })
    }

    render () {
        return (
            <Panel id={this.props.id}>
                <Epic id={"home"} activeStory={this.state.activeStory} tabbar={
                    <Tabbar>
                        <TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'market'}
                            data-story="market"
                        ><Icon28MarketOutline /></TabbarItem>
                        <TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'home'}
                            data-story="home"
                        ><Icon28Play/></TabbarItem>
                        <TabbarItem
                            onClick={this.onStoryChange}
                            selected={this.state.activeStory === 'servers'}
                            data-story="servers"
                        ><Icon28GlobeOutline /></TabbarItem>
                    </Tabbar>
                }>
                    <Market id="market"/>
                    <View id="home" activePanel="home">
                        <Panel id="home">
                            <PanelHeader>
                                <PanelHeaderContent
                                                    before={<Avatar size={32} src={API.userData.photo_100} />}>
                                    {API.userData.first_name + " " + API.userData.last_name}
                                </PanelHeaderContent>
                            </PanelHeader>
                            {/*<FixedLayout>*/}
                            <Group separator="hide" header={<Header level={2}>Новости</Header>}>
                                <NewsCard title={"Обновление!"}>Осталось совсем чуть чуть!</NewsCard>
                            </Group>

                            <Group separator="hide" header={<Header level={2}>Статистика</Header>}>
                                <CardGrid style={{marginTop: 0}}>
                                    <CardRow>
                                        <StatisticsCard counter={"--"} icon={<Icon28BlockOutline height={24} width={24} style={{color: '#EB5757'}}/>}>
                                            Не доступно
                                        </StatisticsCard>
                                        <StatisticsCard counter={"--"} icon={<Icon28BlockOutline height={24} width={24} style={{color: '#EB5757'}}/>}>
                                            Не доступно
                                        </StatisticsCard>
                                    </CardRow>
                                    <CardRow>
                                        <StatisticsCard counter={"--"} icon={<Icon28BlockOutline height={24} width={24} style={{color: '#EB5757'}}/>}>
                                            Не доступно
                                        </StatisticsCard>
                                        <StatisticsCard counter={"--"} icon={<Icon28BlockOutline height={24} width={24} style={{color: '#EB5757'}}/>}>
                                            Не доступно
                                        </StatisticsCard>
                                    </CardRow>
                                    <CardRow>
                                        <StatisticsCard counter={"--"} icon={<Icon28BlockOutline height={24} width={24} style={{color: '#EB5757'}}/>}>
                                            Не доступно
                                        </StatisticsCard>
                                        <StatisticsCard counter={"--"} icon={<Icon28BlockOutline height={24} width={24} style={{color: '#EB5757'}}/>}>
                                            Не доступно
                                        </StatisticsCard>
                                    </CardRow>
                                </CardGrid>
                            </Group>

                            <Group separator="hide">
                                <CardGrid>
                                    <BigButton onClick={this.props.action_create} icon={<Icon28GameOutline/>}>Играть</BigButton>
                                    <BigButton onClick={this.props.action_rooms} icon={<Icon28ArticleOutline/>}>Комнаты</BigButton>
                                </CardGrid>
                            </Group>

                            {/*</FixedLayout>*/}
                        </Panel>
                    </View>
                    <View id="servers" activePanel="servers">
                        <Panel id="servers">
                            <PanelHeader>Топ</PanelHeader>
                            {/*<SimpleCell
                                after={<Header level={2}>1</Header>}
                                description="123 победы"
                                before={<Avatar src="https://sun9-14.userapi.com/impg/JMUL9WggAGTbm8Cg-lAe5ik2UkxiYdLKRmnpCg/uvclLtd-U_0.jpg?size=200x0&quality=90&crop=301,301,721,721&sign=3c8ea00906e9f33c23057eb441afd5e0&ava=1"/>}
                            >
                                Ефим Беляков
                            </SimpleCell>
                            <SimpleCell
                                after={<Header level={2}>2</Header>}
                                description="98 побед"
                                before={<Avatar src="https://sun9-69.userapi.com/impg/QDtjBfyBQflqW5LBGjf2F1QhitMR-Db_l_-lvQ/iISNOb6uFRc.jpg?size=200x0&quality=90&crop=0,44,750,750&sign=e6b4af56b4a37f12f1cad5b5e16b2342&ava=1"/>}
                            >
                                Илья Неделько
                            </SimpleCell>
                            <SimpleCell
                                after={<Header level={2}>3</Header>}
                                description="65 побед"
                                before={<Avatar src="https://sun9-64.userapi.com/impg/oMFeWYoIe1c6bqxK9a5TdBhste6M0mjdYxlfKg/vudKE2o2AZk.jpg?size=200x0&quality=90&crop=0,12,841,841&sign=43f3ef3e92aeba4367d5f8f3e57668eb&ava=1"/>}
                            >
                                Максим Бойцов
                            </SimpleCell>
                            <SimpleCell
                                after={<Header level={2}>4</Header>}
                                description="44 победы"
                                before={<Avatar src="https://sun9-43.userapi.com/impg/OEIr97ILTVoU09TCD_3AYNoFRKjNmx6ANK1HNw/SkDmqKDEVl4.jpg?size=200x0&quality=90&crop=162,0,1362,1362&sign=0cd635e8ad2a562a12367a56331be1cd&ava=1"/>}
                            >
                                Руслан Давлетов
                            </SimpleCell>
                            <SimpleCell
                                after={<Header level={2}>5</Header>}
                                description="43 победы"
                                before={<Avatar src="https://sun9-48.userapi.com/impg/qUDE0Ne2R281Zu5tDFuGnKp6LAPxO-CXX8IRrA/G_0RS7uVnXw.jpg?size=200x0&quality=90&crop=377,448,200,200&sign=88b8962d0718babb0c72be7ca8da9255&ava=1"/>}
                            >
                                Роберт Тоноян
                            </SimpleCell>

                            <SimpleCell
                                after={<Header level={2}>6</Header>}
                                description="40 побед"
                                before={<Avatar src="https://sun9-10.userapi.com/impg/DOwxSidoQA1ZnrnF98p_ugfgUk9Uh870jvZV3g/rq8LaUF6D7c.jpg?size=200x0&quality=90&crop=0,103,1605,1605&sign=8099caf3e954a2f80d42ac714c472200&ava=1"/>}
                            >
                                Никита Нечитайлов
                            </SimpleCell>
                            <SimpleCell
                                after={<Header level={2}>7</Header>}
                                description="38 побед"
                                before={<Avatar src="https://sun2-4.userapi.com/impg/c854216/v854216744/239012/_6zAhsUbPz8.jpg?size=200x0&quality=90&crop=62,0,251,251&sign=69de1375ead8cc584674662c0917b6cb&ava=1"/>}
                            >
                                Маша Новикова
                            </SimpleCell>
                            <SimpleCell
                                after={<Header level={2}>8</Header>}
                                description="35 побед"
                                before={<Avatar src="https://sun2-4.userapi.com/impg/c857320/v857320190/1734af/smdSjkc0azs.jpg?size=200x0&quality=90&crop=2,2,2154,2154&sign=d17726e8ffcc9b4b039f5a015b54704d&ava=1"/>}
                            >
                                Андрей Колоколов
                            </SimpleCell>
                            <SimpleCell
                                after={<Header level={2}>9</Header>}
                                description="33 победы"
                                before={<Avatar src="https://sun9-14.userapi.com/impf/c844723/v844723117/1dd672/hg3OZKFdKCY.jpg?size=200x0&quality=90&crop=0,16,724,1054&sign=5fac44f78d6a3d96983654e903440d57&ava=1"/>}
                            >
                                Николай Бодачевский
                            </SimpleCell>
                            <SimpleCell
                                after={<Header level={2}>10</Header>}
                                description="25 побед"
                                before={<Avatar src="https://sun9-45.userapi.com/impf/f-dt-qIvni-fnF6SavSNwwVNYx8OBBO7ZsYZnw/PCF1I0d-SD0.jpg?size=200x0&quality=90&crop=555,84,1391,1428&sign=3300bff24103629bfd761f92d0c0124b&ava=1"/>}
                            >
                                Аким Курдус
                            </SimpleCell>
                            <SimpleCell
                                after={<Header level={2}>11</Header>}
                                description="21 победа"
                                before={<Avatar src="https://sun2-3.userapi.com/impf/c851220/v851220618/b58ce/-0bRwYaBi6s.jpg?size=200x0&quality=90&crop=2,2,495,495&sign=5af06712e0f16268ee91d8eaaf2be5b5&ava=1"/>}
                            >
                                Александр Сенцов
                            </SimpleCell>
                            <SimpleCell
                                after={<Header level={2}>12</Header>}
                                description="18 побед"
                                before={<Avatar src="https://sun9-8.userapi.com/impg/afNAlfmKyE-LA_nMqyj8r2tn6ypItbbzMSf_ag/8T19sKmYDV0.jpg?size=200x0&quality=90&crop=247,1,898,898&sign=a8f6cce0101980f8162460da7cf95079&ava=1"/>}
                            >
                                Никита Субачев
                                й
                            </SimpleCell>
                            <SimpleCell
                                after={<Header level={2}>13</Header>}
                                description="16 побед"
                                before={<Avatar src="https://sun9-48.userapi.com/impg/E-qAk4FfrXuQnFVW3GxKLxUVBhDsSh2LPKFGcQ/KgYgQ6ojKLc.jpg?size=200x0&quality=90&crop=0,0,750,750&sign=3ad60b0c6a4897a9aec1a725e47a78dc&ava=1"/>}
                            >
                                Pahahontos Uu
                            </SimpleCell>
                            <SimpleCell
                                after={<Header level={2}>14</Header>}
                                description="10 побед"
                                before={<Avatar src="https://sun9-21.userapi.com/impf/o4RKuFXKTYigIzNAUPHXHXEvhDy9Exi17Rhjig/gOlEL-A6m3g.jpg?size=200x0&quality=90&crop=857,959,296,296&sign=44920beb0fa5340ed9f784e39b1b20ed&ava=1"/>}
                            >
                                Максим Комаров
                            </SimpleCell>
                            <SimpleCell
                                after={<Header level={2}>15</Header>}
                                description="8 побед"
                                before={<Avatar src="https://sun2-3.userapi.com/impf/c855120/v855120591/20962/MM1wG4XDNfY.jpg?size=200x0&quality=90&crop=7,7,1430,1430&sign=0e89af40605f3bab81e82247fb28dfe8&ava=1"/>}
                            >
                                Андрей Кулига
                            </SimpleCell>*/}
                            {/*<Div>
                <RoleUserCard expand user={{
                    'first_name': 'Ефим',
                    'last_name': 'Беляков',
                    'avatar': 'https://sun9-14.userapi.com/impg/JMUL9WggAGTbm8Cg-lAe5ik2UkxiYdLKRmnpCg/uvclLtd-U_0.jpg'
                }}
                role={{
                    'local_name': 'Мафия',
                    'image': MafiaImage
                }}>
                </RoleUserCard>
            </Div>*/}
                            <Placeholder
                                icon={<Icon56Users3Outline width={56} height={56}/>}
                                header="Мы не девочки">
                                Мы не носим топики, они как минимум нам не подходят. Хотя кто знает, что будет дальше
                            </Placeholder>
                        </Panel>
                    </View>
                </Epic>
            </Panel>
        )
    }
}

export default NewHome;
