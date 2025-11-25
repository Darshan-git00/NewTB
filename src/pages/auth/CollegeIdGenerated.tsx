import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, CheckCircle, ArrowLeft, Eye, EyeOff, Copy } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

const CollegeIdGenerated = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [showId, setShowId] = useState(false);

  const collegeId = searchParams.get('id') || '';
  const collegeName = searchParams.get('name') || 'Your College';

  useEffect(() => {
    if (!collegeId) {
      // If no college ID is provided, redirect to college signup
      navigate('/auth/college');
    }
  }, [collegeId, navigate]);

  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(collegeId);
      toast.success("College ID copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy College ID");
    }
  };

  const handleGoToDashboard = () => {
    navigate("/college/dashboard");
  };

  if (!collegeId) {
    return null; // Will redirect automatically
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/30 via-background to-muted/30 p-6">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-8 shadow-2xl border-0 bg-background/80 backdrop-blur-xl">
            {/* Back Button */}
            <Link to="/auth/college" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to signup
            </Link>

            {/* Success Icon and Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-2xl mb-6">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              
              <h1 className="text-3xl font-bold mb-2">College Registration Successful!</h1>
              <p className="text-lg text-muted-foreground">
                Your college has been successfully registered with TalentBridge
              </p>
            </div>

            {/* College ID Display */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8 border border-purple-200">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Building className="w-5 h-5 text-purple-600" />
                  <h2 className="text-lg font-semibold text-purple-900">Your College ID</h2>
                </div>
                <p className="text-sm text-purple-700 mb-4">
                  This unique ID identifies your college on TalentBridge. Share this with students who need to register.
                </p>
              </div>

              <div className="bg-white rounded-xl p-4 border border-purple-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                      Official ID
                    </Badge>
                    <span className="text-sm text-muted-foreground">College: {collegeName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowId(!showId)}
                      className="h-8 w-8 p-0 hover:bg-purple-100 text-purple-600"
                      title={showId ? "Hide College ID" : "Show College ID"}
                    >
                      {showId ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCopyId}
                      className="h-8 w-8 p-0 hover:bg-purple-100 text-purple-600"
                      title="Copy College ID"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mt-3 text-center">
                  {showId ? (
                    <div className="font-mono text-2xl font-bold text-purple-900 tracking-wider">
                      {collegeId}
                    </div>
                  ) : (
                    <div className="font-mono text-2xl font-bold text-purple-300 tracking-wider">
                      •••••••••
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="space-y-4 mb-8">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Keep this College ID safe and secure</li>
                  <li>• Students will need this ID to register with your college</li>
                  <li>• You can always find this ID in your college dashboard</li>
                  <li>• Share this ID with authorized personnel only</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={handleGoToDashboard}
                className="flex-1 h-12 rounded-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
              >
                Go to College Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={handleCopyId}
                className="flex-1 h-12 rounded-xl font-semibold border-2 hover:bg-purple-50 transition-colors"
              >
                Copy College ID
              </Button>
            </div>

            {/* Help Section */}
            <div className="mt-8 pt-6 border-t border-border/60">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  Need help? Contact our support team
                </p>
                <Button variant="link" className="text-purple-600 hover:text-purple-700">
                  Get Support
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CollegeIdGenerated;
