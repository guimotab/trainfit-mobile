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
            Configuration: undefined
            EditWorkout: {
                id: number
            }
        }
        interface ParamListBase {
            Workout: {
                id: number
            },
            EditWorkout: {
                id: number
            }
        }
    }

}