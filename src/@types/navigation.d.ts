// import type {
//     CompositeScreenProps,
//     NavigatorScreenParams,
// } from '@react-navigation/native';
// import type { StackScreenProps } from '@react-navigation/stack';
// import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

// export type RootStackParamList = {
//     Home: NavigatorScreenParams<HomeTabParamList>;
//     Workout: { id: string };
//     NotFound: undefined;
// };

// export type RootStackScreenProps<T extends keyof RootStackParamList> =
//     StackScreenProps<RootStackParamList, T>;

// export type HomeTabParamList = {
//     Workout: undefined
//     Configuration: undefined
// };

// export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
//     CompositeScreenProps<
//         BottomTabScreenProps<HomeTabParamList, T>,
//         RootStackScreenProps<keyof RootStackParamList>
//     >;
export type ParamsProps = {
    id: number
}
export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined
            Workout: {
                id: number
            }
            Presets: undefined
            Welcome: undefined
            CreateExercises: undefined
            StyleGroups: undefined
            Pagination: undefined
        }
        interface ParamListBase {
            Workout: {
                id: number
            }
        }
    }

}