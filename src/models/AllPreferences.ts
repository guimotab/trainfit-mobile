import { IPreferences } from "../shared/interfaces/IPreferences";
import { IPreferencesWorkout } from "../shared/interfaces/IPreferencesWorkout";
import { PreferencesWorkout } from "./PreferencesWorkout";

export class AllPreferences {
    private _initializer: boolean
    private _preferencesWorkout: IPreferencesWorkout[]
    constructor({ initializer, preferencesWorkout }: IPreferences) {
        this._initializer = initializer
        this._preferencesWorkout = preferencesWorkout
    }
    returnInformation() {
        return {
            initializer: this._initializer,
            preferencesWorkout: this._preferencesWorkout
        } as IPreferences
    }
    removePreference(idPreference: number) {
        const fakePreferences = [...this._preferencesWorkout]
        const indexPreference = fakePreferences.findIndex(preference => preference.id === idPreference)
        if (indexPreference !== -1) {
            fakePreferences.splice(indexPreference, 1)
            this._preferencesWorkout = fakePreferences
        }
    }
    pushPreference(newPreference: IPreferencesWorkout) {
        const fakePreferences = [...this._preferencesWorkout]
        fakePreferences.push(newPreference)
        this._preferencesWorkout = [...fakePreferences]
    }
    updatePreferenceWorkout(indexPreference: number, newName: string) {
        const fakePreferences = [...this._preferencesWorkout]
        const preferenceClass = new PreferencesWorkout(fakePreferences[indexPreference])
        preferenceClass.nameMuscleGroup = newName
        fakePreferences.splice(indexPreference, 1, preferenceClass.returnPreferences())
        this._preferencesWorkout = [...fakePreferences]
    }

    public get initializer(): boolean {
        return this._initializer
    }
    public set initializer(newInitializer: boolean) {
        this._initializer = newInitializer
    }

    public get preferences(): IPreferencesWorkout[] {
        return this._preferencesWorkout
    }
}