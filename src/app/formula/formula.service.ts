import { Injectable } from '@angular/core';
import { ApiService } from '../ApiService.service';
@Injectable()
export class FormulaService {
    constructor(private apiService: ApiService) { }
    formulaInformation = {
        createInformation: {
            formula: '',
            description: '',
            numberOfParameters: null,
            unitOfMeasurementCode:null
        },
        parameterInformation: {
            parameters: [] as { paramID: [], paramDescription: [] }[]
        },
        relationInformation: {
            formulaLogic: '',
        },
        testInformation: {
            variables: [] as { variableName: string, variableValue: number }[]
        }
    };
    getFormulaInformation() {
        return this.formulaInformation;
    }
    addApiRecord(row: {}) {
        this.apiService.post<any>('formulas', row).subscribe((response) => {
            console.log('formula created:', response);
        });
        return this.apiService.post<any>('formulas', row);
    }

    setFormulaformation(formulaInformation: {
        createInformation: { formula: string; description: string; numberOfParameters: null;unitOfMeasurementCode: null };
        parameterInformation: {
            parameters: { paramID: []; paramDescription: [] }[];
        };
        relationInformation: { formulaLogic: string; };
        testInformation: {
            variables: { variableName: string; variableValue: number; }[];
        };
    }) {
        this.formulaInformation = formulaInformation;
    }
}




