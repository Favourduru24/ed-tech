const getAllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate("userId", "username");

    if (!quizzes?.length) {
      return res.status(404).json({ message: 'No quizzes found' });
    }

    const voiceOptimizedQuizzes = quizzes.map(quiz => {
      try {
        const rawQuestions = quiz.questions[0];
        const questionsArray = JSON.parse(JSON.parse(rawQuestions));

        const questionsForVoice = questionsArray
          .filter((_, index) => index % 2 === 0) // Only questions (even indices)
          .map((q, i) => {
            const questionText = q.replace('Question: ', '');
            const answerLine = questionsArray[i * 2 + 1].replace('Correct answer: ', '');
            const [correctAnswer, explanation] = answerLine.split('. ');

            // Format for TTS (e.g., "A. Option 1, B. Option 2...")
            const optionsText = questionText
              .split('?')[1] // Get options part
              .trim()
              .replace(/\s+/g, ' ') // Clean extra spaces
              .replace(/([A-D])\./g, ', $1. '); // "A. X B. Y" → ", A. X, B. Y"

            return {
              text: `Question ${i + 1}: ${questionText.split('?')[0]}?`, // "Question 1: What is 2+2?"
              options: optionsText.slice(2), // Remove leading ", "
              correctAnswer: `The correct answer is ${correctAnswer}. ${explanation}`,
              shortAnswer: correctAnswer.split(' ')[0], // Just "A", "B", etc.
            };
          });

        return {
          ...quiz.toObject(),
          questions: questionsForVoice,
        };
      } catch (error) {
        console.error(`Failed to parse questions for quiz ${quiz._id}:`, error);
        return { ...quiz.toObject(), questions: [] };
      }
    });

    res.status(200).json(voiceOptimizedQuizzes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch quizzes' });
  }
};


async function startQuiz(quizId) {
  const response = await fetch(`/api/quiz/${quizId}`);
  const quiz = await response.json();

  for (const question of quiz.questions) {
    // Speak the question and options
    await vapi.speak(`${question.text} Options: ${question.options}`);

    // Listen for user's voice answer (e.g., "A", "B", etc.)
    const userAnswer = await vapi.listen({
      type: 'options',
      options: ['A', 'B', 'C', 'D'],
    });

    // Validate and respond
    if (userAnswer === question.shortAnswer) {
      await vapi.speak("Correct! " + question.correctAnswer);
    } else {
      await vapi.speak(`Incorrect. ${question.correctAnswer}`);
    }
  }
}


 questions: [
      "[\n  \"Question: Which family contains the most reactive metals? A. Alkali metals B. Alkaline earth metals C. Transition metals D. Noble gases\",\n  \"Correct answer: A. Alkali metals. They have only one valence electron, easily lost.\",\n  \"Question: Which element is a halogen? A. Sodium B. Potassium C. Chlorine D. Calcium\",\n  \"Correct answer: C. Chlorine. Halogens are in Group 17 and are highly reactive nonmetals.\",\n  \"Question: Which family is known as the noble gases? A. Group 1 B. Group 2 C. Group 17 D. Group 18\",\n  \"Correct answer: D. Group 18. Noble gases are very stable and unreactive.\",\n  \"Question: Which family includes elements used in fertilizers? A. Alkali metals B. Alkaline earth metals C. Transition metals D. Halogens\",\n  \"Correct answer: B. Alkaline earth metals. Calcium and magnesium are important plant nutrients.\",\n  \"Question: Which family contains elements that are typically good conductors of electricity? A. Halogens B. Noble gases C. Transition metals D. Chalcogens\",\n  \"Correct answer: C. Transition metals. Most transition metals are excellent conductors.\",\n  \"Question: Which element is an example of an alkali metal? A. Magnesium B. Calcium C. Sodium D. Aluminum\",\n  \"Correct answer: C. Sodium. Sodium is in Group 1, the alkali metals.\",\n  \"Question: Which family is known for forming salts with alkali metals? A. Noble gases B. Halogens C. Alkaline earth metals D. Transition metals\",\n  \"Correct answer: B. Halogens. They readily react with alkali metals to form salts.\",\n  \"Question: Which family contains elements that are all gases at room temperature? A. Alkali metals B. Alkaline earth metals C. Halogens D. Noble gases\",\n  \"Correct answer: D. Noble gases. They exist as monatomic gases.\",\n  \"Question: Which family includes elements that commonly form +2 ions? A. Alkali metals B. Alkaline earth metals C. Halogens D. Noble gases\",\n  \"Correct answer: B. Alkaline earth metals. They lose two electrons to achieve a stable configuration.\",\n  \"Question: Which family is characterized by having full outer electron shells? A. Alkali metals B. Halogens C. Transition metals D. Noble gases\",\n  \"Correct answer: D. Noble gases. This makes them very stable and unreactive.\"\n]\n"
    ]

    import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string): string => {
    return dayjs(dateString).format("MMMM DD, YYYY");
};

export function parseMarkdownToJson(markdownText: string): unknown | null {
    const regex = /```json\n([\s\S]+?)\n```/;
    const match = markdownText.match(regex);

    if (match && match[1]) {
        try {
            return JSON.parse(match[1]);
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return null;
        }
    }
    console.error("No valid JSON found in markdown text.");
    return null;
}

export function parseTripData(jsonString: string): Trip | null {
    try {
        const data: Trip = JSON.parse(jsonString);

        return data;
    } catch (error) {
        console.error("Failed to parse trip data:", error);
        return null;
    }
}

export function getFirstWord(input: string = ""): string {
    return input.trim().split(/\s+/)[0] || "";
}

export const calculateTrendPercentage = (
    countOfThisMonth: number,
    countOfLastMonth: number
): TrendResult => {
    if (countOfLastMonth === 0) {
        return countOfThisMonth === 0
            ? { trend: "no change", percentage: 0 }
            : { trend: "increment", percentage: 100 };
    }

    const change = countOfThisMonth - countOfLastMonth;
    const percentage = Math.abs((change / countOfLastMonth) * 100);

    if (change > 0) {
        return { trend: "increment", percentage };
    } else if (change < 0) {
        return { trend: "decrement", percentage };
    } else {
        return { trend: "no change", percentage: 0 };
    }
};

export const formatKey = (key: keyof TripFormData) => {
    return key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
};


import { parseTripData } from "~/lib/utils";
import { database, appwriteConfig } from "./client";

interface Document {
    [key: string]: any;
}

type FilterByDate = (
    items: Document[],
    key: string,
    start: string,
    end?: string
) => number;

export const getUsersAndTripsStats = async (): Promise<DashboardStats> => {
    const d = new Date();
    const startCurrent = new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
    const startPrev = new Date(d.getFullYear(), d.getMonth() -1, 1).toISOString();
    const endPrev = new Date(d.getFullYear(), d.getMonth(), 0).toISOString();

    const [users, trips] = await Promise.all([
        database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId
        ),
        database.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.tripCollectionId
        ),
    ])

    const filterByDate: FilterByDate = (items, key, start, end) => items.filter((item) => (
        item[key] >= start && (!end || item[key] <= end)
    )).length;

    const filterUsersByRole = (role: string) => {
        return users.documents.filter((u: Document) => u.status === role)
    }

    return {
        totalUsers: users.total,
        usersJoined: {
            currentMonth: filterByDate(
                users.documents,
                'joinedAt',
                startCurrent,
                undefined
            ),
            lastMonth: filterByDate(
                users.documents,
                'joinedAt',
                startPrev,
                endPrev
            )
        },
        userRole: {
            total: filterUsersByRole('user').length,
            currentMonth: filterByDate(
                filterUsersByRole('user'),
                'joinedAt',
                startCurrent,
                undefined
            ),
            lastMonth: filterByDate(
                filterUsersByRole('user'),
                'joinedAt',
                startPrev,
                endPrev
            )
        },
        totalTrips: trips.total,
        tripsCreated: {
            currentMonth: filterByDate(
                trips.documents,
                'createdAt',
                startCurrent,
                undefined
            ),
            lastMonth: filterByDate(
                filterUsersByRole('user'),
                'joinedAt',
                startPrev,
                endPrev
            )
        },
    }
}

export const getUserGrowthPerDay = async () => {
    const users = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId
    );

    const userGrowth = users.documents.reduce(
        (acc: { [key: string]: number }, user: Document) => {
            const date = new Date(user.joinedAt);
            const day = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        },
        {}
    );

    return Object.entries(userGrowth).map(([day, count]) => ({
        count: Number(count),
        day,
    }));
};

export const getTripsCreatedPerDay = async () => {
    const trips = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tripCollectionId
    );

    const tripsGrowth = trips.documents.reduce(
        (acc: { [key: string]: number }, trip: Document) => {
            const date = new Date(trip.createdAt);
            const day = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        },
        {}
    );

    return Object.entries(tripsGrowth).map(([day, count]) => ({
        count: Number(count),
        day,
    }));
};

export const getTripsByTravelStyle = async () => {
    const trips = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.tripCollectionId
    );

    const travelStyleCounts = trips.documents.reduce(
        (acc: { [key: string]: number }, trip: Document) => {
            const tripDetail = parseTripData(trip.tripDetails);

            if (tripDetail && tripDetail.travelStyle) {
                const travelStyle = tripDetail.travelStyle;
                acc[travelStyle] = (acc[travelStyle] || 0) + 1;
            }
            return acc;
        },
        {}
    );

    return Object.entries(travelStyleCounts).map(([travelStyle, count]) => ({
        count: Number(count),
        travelStyle,
    }));
};