import { mapDispatchToProps, mapStateToProps } from './Hooks';

export type ReduxConnectType = ReturnType<typeof mapDispatchToProps> & ReturnType<typeof mapStateToProps>;
