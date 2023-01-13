import {TASK_TYPES} from '../constants';
import {TaskSettingsType} from "../types";
import BaseTaskModel from '../models/tasks/base-task-model';
import AddictionTaskModel from '../models/tasks/addiction-task-model';
import AddictionReversedTaskModel from '../models/tasks/addiction-reversed-task-model';
import SubtractionTaskModel from '../models/tasks/subtraction-task-model';
import SubtractionReversedTaskModel from '../models/tasks/subtraction-reversed-task-model';
import ComparisonTaskModel from '../models/tasks/comparison-task-model';
import ReadingTaskModel from '../models/tasks/reading-task-model';

type TaskDataItemType = {
    type: string;
    caption: string;
};

class TaskFactory {

    private _taskData: TaskDataItemType[] =
    [
        {
            type: TASK_TYPES.ADDICTION,
            caption: 'Addiction (A + B)',
        },
        {
            type: TASK_TYPES.ADDICTION_REVERSED,
            caption: 'Addiction reversed (A + ?)',
        },
        {
            type: TASK_TYPES.SUBTRACTION,
            caption: 'Subtraction (A - B)',
        },
        {
            type: TASK_TYPES.SUBTRACTION_REVERSED,
            caption: 'Subtraction reversed (A - ?)',
        },
        {
            type: TASK_TYPES.COMPARISON,
            caption: 'Comparison',
        },
        {
            type: TASK_TYPES.READING,
            caption: 'Reading',
        },
    ];

    public createTask(taskType: string, settings: TaskSettingsType) {
        let taskModel: BaseTaskModel;
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
        taskModel.initTask();
        return taskModel;
    }

    public getTasksTypesList(): string[] {
        let typesList: string[] = [];
        type ObjectKey = keyof typeof TASK_TYPES;
        for (let type in TASK_TYPES) {
            const key = type as ObjectKey;
            typesList.push(TASK_TYPES[key]);
        }
        return typesList;
    }

    public getTaskCaption(type: string): string {
        let caption: string = '';

        this._taskData.map(function(data) {
            if (data.type === type) {
                caption = data.caption;
            }
        });

        if (! caption) {
            caption = type;
        }

        return caption;
    }
}

export default TaskFactory;
