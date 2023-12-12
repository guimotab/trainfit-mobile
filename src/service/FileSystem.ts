import * as FileSystem from 'expo-file-system';
import { StorageAccessFramework } from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as DocumentPicker from 'expo-document-picker';
import { Alert } from 'react-native';
import { IMuscleGroup } from '../shared/interfaces/IMuscleGroup';
import { IPreferences } from '../shared/interfaces/IPreferences';
export abstract class FileSystemTrainFit {
    static uri: FileSystem.FileSystemRequestDirectoryPermissionsResult
    static async downloadFile() {
        if (!this.uri) {
            this.uri = await StorageAccessFramework.requestDirectoryPermissionsAsync()
        }
        if (this.uri.granted) {
            try {
                const file = await StorageAccessFramework.createFileAsync(this.uri.directoryUri, "TrainFitData", "text/plain")
                await StorageAccessFramework.writeAsStringAsync(`${file}`, `
                    ${await AsyncStorage.getItem("Workout")}||${await AsyncStorage.getItem("PreferencesWorkout")}
                `)
                Alert.alert('Arquivo Salvo', 'Seu arquivo foi salvo com sucesso.');
            } catch (error) {
                Alert.alert('Erro Ao Salvar', 'Ocorreu um erro ao salvar seu arquivo.');
            }
        }

    }
    static async uploadFile() {
        try {
            const file = DocumentPicker.getDocumentAsync()
            const fileSelected = await FileSystem.readAsStringAsync((await file).assets![0].uri)
            const result = fileSelected.split("||")
            const tables = JSON.parse(result[0]) as IMuscleGroup[]
            const preferences = JSON.parse(result[1]) as IPreferences
            Promise.all([
                AsyncStorage.setItem("Workout", result[0]),
                AsyncStorage.setItem("PreferencesWorkout", result[1])
            ])
            return [tables, preferences]
        } catch (error) {
            Alert.alert('Erro ao Fazer Upload', 'Ocorreu um erro ao tentar ler arquivo.');
            return []
        }
    }
}