// services/getProjects.ts
"use server"

import {Project} from "@/models/Project"
import {getTeams} from "@/services/dash/getTeams";

export const getProject = async (orgId: string) => {
    const teams = await getTeams(orgId)

    if(!teams || teams.length == 0 ) {
        return {
            total: 0,
            completedCount: 0,
            incompleteCount: 0,
            percentCompleted: "0",
            completed: [],
            incomplete: [],
            teamsWorking: 0
        }
    }

    const allProjects: any[] = []

    for(const team of teams){
        const pk = team.SK

        const projects = await Project.query("PK")
            .eq(pk)
            .where("SK")
            .beginsWith("PROJECT#")
            .exec()

        if(projects && projects.length > 0 ) allProjects.push(...projects)
    }

    const { completed, incomplete } = allProjects.reduce(
        (acc, p) => {
            if (p.completed) acc.completed.push(p);
            else acc.incomplete.push(p);
            return acc;
        },
        { completed: [], incomplete: [] }
    );

    // Serialize all the data properly
    return JSON.parse(JSON.stringify({
        total: allProjects.length || 0,
        completedCount: completed.length,
        incompleteCount: incomplete.length,
        percentCompleted: ((completed.length / allProjects.length) * 100).toFixed(2),
        completed,
        incomplete,
        teamsWorking: teams.length
    }));
}