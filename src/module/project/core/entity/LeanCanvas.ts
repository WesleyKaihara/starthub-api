export default class LeanCanvas {
  projectId: number;
  problem: string;
  customerSegments: string;
  uniqueValueProposition: string;
  solution: string;
  channels: string;
  revenueStreams: string;
  costStructure: string;
  keyMetrics: string;
  unfairAdvantage: string;

  static create(
    projectId: number,
    problem: string,
    customerSegments: string,
    uniqueValueProposition: string,
    solution: string,
    channels: string,
    revenueStreams: string,
    costStructure: string,
    keyMetrics: string,
    unfairAdvantage: string,
  ): LeanCanvas {
    const leanCanvas = new LeanCanvas();
    leanCanvas.projectId = projectId;
    leanCanvas.problem = problem;
    leanCanvas.customerSegments = customerSegments;
    leanCanvas.uniqueValueProposition = uniqueValueProposition;
    leanCanvas.solution = solution;
    leanCanvas.channels = channels;
    leanCanvas.revenueStreams = revenueStreams;
    leanCanvas.costStructure = costStructure;
    leanCanvas.keyMetrics = keyMetrics;
    leanCanvas.unfairAdvantage = unfairAdvantage;
    leanCanvas.isValid();
    return leanCanvas;
  }

  static update(
    projectId: number,
    problem: string,
    customerSegments: string,
    uniqueValueProposition: string,
    solution: string,
    channels: string,
    revenueStreams: string,
    costStructure: string,
    keyMetrics: string,
    unfairAdvantage: string,
  ): LeanCanvas {
    const leanCanvas = new LeanCanvas();
    leanCanvas.projectId = projectId;
    leanCanvas.problem = problem;
    leanCanvas.customerSegments = customerSegments;
    leanCanvas.uniqueValueProposition = uniqueValueProposition;
    leanCanvas.solution = solution;
    leanCanvas.channels = channels;
    leanCanvas.revenueStreams = revenueStreams;
    leanCanvas.costStructure = costStructure;
    leanCanvas.keyMetrics = keyMetrics;
    leanCanvas.unfairAdvantage = unfairAdvantage;
    leanCanvas.isValid();
    return leanCanvas;
  }

  static restore(
    projectId: number,
    problem: string,
    customerSegments: string,
    uniqueValueProposition: string,
    solution: string,
    channels: string,
    revenueStreams: string,
    costStructure: string,
    keyMetrics: string,
    unfairAdvantage: string,
  ): LeanCanvas {
    const leanCanvas = new LeanCanvas();
    leanCanvas.projectId = projectId;
    leanCanvas.problem = problem;
    leanCanvas.customerSegments = customerSegments;
    leanCanvas.uniqueValueProposition = uniqueValueProposition;
    leanCanvas.solution = solution;
    leanCanvas.channels = channels;
    leanCanvas.revenueStreams = revenueStreams;
    leanCanvas.costStructure = costStructure;
    leanCanvas.keyMetrics = keyMetrics;
    leanCanvas.unfairAdvantage = unfairAdvantage;
    return leanCanvas;
  }

  private isValid() {
    return true;
  }
}
