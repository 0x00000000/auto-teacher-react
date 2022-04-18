import {TASK_TYPES} from '../constants';
import {TaskSettings} from "../types";

import BaseTaskModel from '../models/tasks/base-task-model';
import AddictionTaskModel from '../models/tasks/addiction-task-model';
import AddictionReversedTaskModel from '../models/tasks/addiction-reversed-task-model';
import SubtractionTaskModel from '../models/tasks/subtraction-task-model';
import SubtractionReversedTaskModel from '../models/tasks/subtraction-reversed-task-model';
import ComparisonTaskModel from '../models/tasks/comparison-task-model';
import ReadingTaskModel from '../models/tasks/reading-task-model';

class TaskFactory {
    createTask(taskType: string, baseLevel: number, totalScore: number) {
        let taskModel: BaseTaskModel;
        let settings: TaskSettings = {
            baseLevel: baseLevel,
            totalScore: totalScore,
        };
        switch (taskType) {
            case TASK_TYPES.ADDICTION:
                taskModel = new AddictionTaskModel(settings);
                break;
            case TASK_TYPES.ADDICTION_REVERSED:
                taskModel = new AddictionReversedTaskModel(settings);
                break;
            case TASK_TYPES.SUBTRACTION:
                taskModel = new SubtractionTaskModel(settings);
                break;
            case TASK_TYPES.SUBTRACTION_REVERSED:
                taskModel = new SubtractionReversedTaskModel(settings);
                break;
            case TASK_TYPES.COMPARISON:
                taskModel = new ComparisonTaskModel(settings);
                break;
            case TASK_TYPES.READING:
                taskModel = new ReadingTaskModel(settings);
                break;
            default:
                taskModel = new AddictionTaskModel(settings);
                break;
        }
        taskModel.init();
        return taskModel;
    }
}

export default TaskFactory;
