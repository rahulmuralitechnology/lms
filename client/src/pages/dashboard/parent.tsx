import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Loader2, Users, Activity, BarChart, 
  Calendar, Target, BookOpen, Award,
  AlertCircle
} from "lucide-react";
import { type User } from "@shared/schema";
import { Progress } from "@/components/ui/progress";

export default function ParentDashboard() {
  const { user, logoutMutation } = useAuth();
  const { data: students, isLoading } = useQuery<User[]>({
    queryKey: ["/api/parent-students"],
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
              <Users className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">{user?.displayName}</h1>
              <p className="text-sm text-muted-foreground">Parent Dashboard</p>
            </div>
          </div>
          <Button variant="outline" onClick={() => logoutMutation.mutate()}>
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Students Monitored</CardTitle>
                <CardDescription>Active learners under your supervision</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{students?.length || 0}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Progress</CardTitle>
                <CardDescription>Overall course completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">65%</div>
                  <Progress value={65} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
                <CardDescription>Average score across subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">B+</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Student Progress Reports</h2>

            {students?.map((student) => (
              <Card key={student.id} className="overflow-hidden">
                <CardHeader className="bg-muted/50">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 bg-background rounded-full">
                      <Target className="h-5 w-5" />
                    </div>
                    {student.displayName}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4" />
                          <span className="font-medium">Active Courses</span>
                        </div>
                        <p className="text-2xl font-bold">3</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          <span className="font-medium">Achievements</span>
                        </div>
                        <p className="text-2xl font-bold">5</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span className="font-medium">Study Time</span>
                        </div>
                        <p className="text-2xl font-bold">15h</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-sm">Course Progress</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Mathematics</span>
                            <span className="text-muted-foreground">75%</span>
                          </div>
                          <Progress value={75} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Science</span>
                            <span className="text-muted-foreground">60%</span>
                          </div>
                          <Progress value={60} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>Literature</span>
                            <span className="text-muted-foreground">90%</span>
                          </div>
                          <Progress value={90} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium text-sm">Recent Activities</h3>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <Activity className="h-4 w-4 text-green-500" />
                          <span>Completed Mathematics Quiz - Score: 85%</span>
                          <span className="text-muted-foreground ml-auto">2 days ago</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                          <span>Missed Science Assignment Deadline</span>
                          <span className="text-muted-foreground ml-auto">5 days ago</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="w-full">
                        View Detailed Report
                      </Button>
                      <Button variant="outline" className="w-full">
                        Contact Teacher
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {(!students || students.length === 0) && (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No students linked to your account yet.</p>
                  <p className="text-sm">Please contact the school administrator to link your students.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}