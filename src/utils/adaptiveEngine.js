export function getAdaptiveLevel() {
    const knowledge = JSON.parse(
        localStorage.getItem("knowledgeValidation") || "null"
    );

    const project = JSON.parse(
        localStorage.getItem("projectValidation") || "null"
    );

    const roadmap = JSON.parse(
        localStorage.getItem("roadmapProgress") || "null"
    );

    const knowledgeScore = Number(
        knowledge?.percentage || 0
    );

    const projectScore = Number(
        project?.score || 0
    );

    let roadmapScore = 0;

    if (
        roadmap &&
        Array.isArray(roadmap.completedTopics)
    ) {
        roadmapScore = Math.min(
            100,
            Math.round(
                (roadmap.completedTopics.length / 32) * 100
            )
        );
    }

    const overallScore = Math.round(
        knowledgeScore * 0.4 +
        projectScore * 0.3 +
        roadmapScore * 0.3
    );

    let level;

    if (overallScore < 50) {
        level = "revision";
    } else if (overallScore < 80) {
        level = "normal";
    } else {
        level = "advanced";
    }

    return {
        level,
        score: overallScore,
        knowledgeScore,
        projectScore,
        roadmapScore
    };
}