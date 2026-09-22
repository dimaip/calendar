import React from 'react';
import { useTheme } from 'emotion-theming';

interface IconTheme {
    colours?: {
        gray?: string;
    };
}

const QuestionMarkCircle = ({ colour }: { colour?: string }): JSX.Element => {
    const theme = useTheme<IconTheme>();

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 15 15">
            <path
                fill={colour || theme.colours?.gray || '#acacb0'}
                d="M7.5 0C3.36 0 0 3.36 0 7.5S3.36 15 7.5 15 15 11.64 15 7.5 11.64 0 7.5 0m.408 11.797h-1.18a.1.1 0 0 1-.1-.1v-1.18a.1.1 0 0 1 .1-.1h1.18a.1.1 0 0 1 .1.1v1.18a.1.1 0 0 1-.1.1m.664-3.867c-.633.425-.72.814-.72 1.172v.43a.117.117 0 0 1-.118.116h-.859a.117.117 0 0 1-.117-.117v-.43c0-.855.394-1.536 1.204-2.08.753-.505 1.179-.826 1.179-1.53 0-.479-.274-.843-.84-1.112-.133-.063-.43-.125-.794-.12-.458.005-.814.115-1.087.335-.517.416-.56.869-.56.875a2.6 2.6 0 0 0-.033.401.117.117 0 0 1-.118.117h-.83a.117.117 0 0 1-.117-.105 2.4 2.4 0 0 1 .004-.468c.008-.095.07-.95.967-1.672.465-.374 1.057-.569 1.758-.578.496-.005.962.079 1.278.228.946.45 1.465 1.195 1.465 2.099 0 1.322-.883 1.915-1.662 2.439"
            />
        </svg>
    );
};

export default QuestionMarkCircle;
