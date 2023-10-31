import {TaskTable} from "@/components/tables/task-table";

export const metadata = {
    title: "Tasker - Task"
};

export default function ConsoleIndex() {
    return (
        <div className='p-5 h-screen'>
            <div className='p-5 max-h-[100%] rounded-md bg-indigo-950 overflow-y-auto'>
                <span className='font-bold text-xl'>Projects</span>

                <table className='table table-auto w-[100%] mt-5'>
                    <thead className='bg-violet-950'>
                    <tr>
                        <th className='text-start'>Title</th>
                        <th className='text-start'>Project</th>
                        <th className='text-start'>Url</th>
                        <th className='text-start'>Description</th>
                        <th className='text-start'>Status</th>
                        <th></th>
                    </tr>
                    </thead>
                    <TaskTable project_id={null}/>
                </table>
            </div>
        </div>
    )
}