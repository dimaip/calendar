import React from 'react';
import { useTheme } from 'emotion-theming';

const ShareIcon = () => {
    const theme = useTheme();
    const isIOS =
        (/iPad|iPhone|iPod/.test(navigator.platform) || navigator.platform === 'MacIntel') && !window.MSStream;
    if (isIOS) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width={20} height={15.375} viewBox="0 0 15 15.375">
                <g transform="translate(-4 -3)">
                    <g transform="translate(4 3)">
                        <path
                            d="M12.25,5.564v7.187a.75.75,0,0,1-1.5,0V5.562L9.9,6.409A.75.75,0,0,1,8.842,5.348l2.131-2.131A.738.738,0,0,1,11.5,3L11.5,3a.738.738,0,0,1,.522.215l2.131,2.131a.75.75,0,0,1-1.061,1.061ZM5.5,16.875h12V11.622a.75.75,0,0,1,1.5,0v6.007a.743.743,0,0,1-.218.528.752.752,0,0,1-.531.219H4.749A.748.748,0,0,1,4,17.628V11.622a.75.75,0,0,1,1.5,0Z"
                            transform="translate(-4 -3)"
                            fill={theme.colours.gray}
                            fillRule="evenodd"
                        />
                    </g>
                </g>
            </svg>
        );
    }
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 16.462" width={20} height={16.462}>
            <path
                d="M3.432 9.424a1.373 1.373 0 10-1.875-.5 1.373 1.373 0 001.875.5zm1.266.742A2.745 2.745 0 114.7 6.312L9.6 3.48a2.745 2.745 0 11.7 1.189L5.391 7.5a2.742 2.742 0 010 1.479l4.874 2.814a2.745 2.745 0 11-.686 1.189L4.7 10.166zm8.243-6.232a1.373 1.373 0 10-1.875-.5 1.373 1.373 0 001.875.5zm-1.406 10.971a1.373 1.373 0 10-.5-1.875 1.373 1.373 0 00.5 1.875z"
                fill={theme.colours.gray}
            />
        </svg>
    );
};
export default ShareIcon;
