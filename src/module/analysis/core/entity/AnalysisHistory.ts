export class AnalysisHistory {
  id?: number;
  request: string;
  result: string;

  static create(request: string, result: string): AnalysisHistory {
    const analysis = new AnalysisHistory();
    analysis.request = request;
    analysis.result = result;
    return analysis;
  }

  static restore(id: number, request: string, result: string): AnalysisHistory {
    const analysis = new AnalysisHistory();
    analysis.id = id;
    analysis.request = request;
    analysis.result = result;
    return analysis;
  }
}
