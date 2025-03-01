import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Book, GraduationCap, Brain, Bookmark, VideoIcon, CheckCircle } from "lucide-react";
import { type Lesson } from "@shared/schema";
import { Whiteboard } from "@/components/whiteboard";
import { VoiceRecorder } from "@/components/voice-recorder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

export default function StudentDashboard() {
  const { user, logoutMutation } = useAuth();
  const { data: lessons, isLoading } = useQuery<Lesson[]>({
    queryKey: ["/api/lessons"],
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-primary rounded-full">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">{user?.displayName}</h1>
              <p className="text-sm text-muted-foreground">Learning Dashboard</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => logoutMutation.mutate()}>
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid grid-cols-4 gap-4 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="study">Study Space</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Enrolled Courses</CardTitle>
                    <CardDescription>Active learning paths</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{lessons?.length || 0}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Progress</CardTitle>
                    <CardDescription>Overall completion</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold">45%</div>
                      <Progress value={45} />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quiz Score</CardTitle>
                    <CardDescription>Average performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">85%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Study Time</CardTitle>
                    <CardDescription>This week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">12h</div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activities</CardTitle>
                    <CardDescription>Your latest learning progress</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-muted rounded-full">
                          <VideoIcon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Completed Video Lesson</p>
                          <p className="text-sm text-muted-foreground">Introduction to Calculus</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-muted rounded-full">
                          <Brain className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Quiz Completed</p>
                          <p className="text-sm text-muted-foreground">Scored 90%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Deadlines</CardTitle>
                    <CardDescription>Tasks and assignments due</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-muted rounded-full">
                          <Bookmark className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Physics Quiz</p>
                          <p className="text-sm text-muted-foreground">Due in 2 days</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="courses">
            <div className="space-y-6">
              {lessons?.map((lesson) => (
                <Card key={lesson.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Book className="h-5 w-5" />
                      {lesson.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none mb-6">
                      <p>{lesson.content}</p>
                    </div>

                    <div className="space-y-6 border-t pt-6">
                      <div>
                        <h3 className="font-semibold mb-2">Voice Answer</h3>
                        <VoiceRecorder
                          onRecordingComplete={(blob) => {
                            console.log("Recording completed:", blob);
                          }}
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Written Answer</h3>
                        <textarea
                          className="w-full min-h-[100px] p-2 border rounded-md"
                          placeholder="Type your answer here..."
                        />
                        <Button className="mt-2">Submit Answer</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {(!lessons || lessons.length === 0) && (
                <Card>
                  <CardContent className="py-6 text-center text-muted-foreground">
                    <Book className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No courses enrolled yet.</p>
                    <p className="text-sm">Browse available courses to start learning!</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="study">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Interactive Study Space</CardTitle>
                  <CardDescription>
                    Use this collaborative space for notes and practice
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Whiteboard
                    onSave={(dataUrl) => {
                      console.log("Whiteboard saved:", dataUrl);
                    }}
                  />
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Voice Notes</CardTitle>
                    <CardDescription>Record audio notes for your studies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <VoiceRecorder
                      onRecordingComplete={(blob) => {
                        console.log("Voice note recorded:", blob);
                      }}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Study Resources</CardTitle>
                    <CardDescription>Access additional learning materials</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center text-muted-foreground py-8">
                      <Book className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No resources available yet</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Learning Analytics</CardTitle>
                    <CardDescription>Track your performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {lessons?.map((lesson, index) => (
                        <div key={lesson.id} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{lesson.title}</span>
                            <span className="text-muted-foreground">75%</span>
                          </div>
                          <Progress value={75} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Your learning milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-muted rounded-full">
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium">Quick Learner</p>
                          <p className="text-sm text-muted-foreground">
                            Completed 5 lessons in a week
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}