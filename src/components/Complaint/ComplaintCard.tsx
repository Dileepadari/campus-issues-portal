
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Complaint } from '@/lib/types';
import { CalendarIcon, ClockIcon, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';

interface ComplaintCardProps {
  complaint: Complaint;
  isAdmin?: boolean;
}

const ComplaintCard = ({ complaint, isAdmin = false }: ComplaintCardProps) => {
  const [expanded, setExpanded] = useState(false);

  // Format the date
  const formattedDate = format(new Date(complaint.createdAt), 'MMM d, yyyy');
  
  // Truncate description if too long and not expanded
  const shouldTruncate = complaint.description.length > 100 && !expanded;
  const displayDescription = shouldTruncate 
    ? `${complaint.description.substring(0, 100)}...` 
    : complaint.description;

  // Get status badge component
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-amber-50 text-amber-600 border-amber-200">Pending</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">In Progress</Badge>;
      case 'resolved':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Resolved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="mb-4 overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{complaint.title}</CardTitle>
          {getStatusBadge(complaint.status)}
        </div>
        <div className="flex items-center text-sm text-gray-500 mt-1 space-x-4">
          <Badge variant="outline" className="text-xs">
            {complaint.category.charAt(0).toUpperCase() + complaint.category.slice(1)}
          </Badge>
          <div className="flex items-center">
            <CalendarIcon className="h-3 w-3 mr-1" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="h-3 w-3 mr-1" />
            <span>{complaint.responses?.length || 0} response{complaint.responses?.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        <p className="text-sm text-gray-700">{displayDescription}</p>
        {shouldTruncate && (
          <Button 
            variant="link" 
            className="p-0 h-auto text-xs mt-1" 
            onClick={() => setExpanded(true)}
          >
            Read more
          </Button>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          ID: <span className="font-mono">{complaint.trackingId}</span>
        </div>
        <Link to={`/complaint/${complaint.id}`}>
          <Button variant="outline" size="sm">
            {isAdmin ? 'Review & Respond' : 'View Details'}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ComplaintCard;
