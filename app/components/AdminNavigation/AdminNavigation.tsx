import React from 'react';
import { css } from 'emotion';
import { useTheme } from 'emotion-theming';
import { NavLink } from 'react-router-dom';

import type { AppTheme } from 'styles/AppTheme';

const sections = [
    { path: '/admin/updates', label: 'Обновления' },
    { path: '/admin/broadcasts', label: 'Трансляции' },
];

export default function AdminNavigation() {
    const theme = useTheme<AppTheme>();

    return (
        <div
            className={css`
                padding: 16px 12px 0;
                background: ${theme.colours.bgGrayLight};
            `}
        >
            <nav
                aria-label="Разделы администрирования"
                className={css`
                    display: flex;
                    gap: 4px;
                    padding: 4px;
                    border: 1px solid ${theme.colours.lineGray};
                    border-radius: 14px;
                    background: ${theme.colours.bgGray};
                `}
            >
                {sections.map((section) => (
                    <NavLink
                        key={section.path}
                        to={section.path}
                        className={css`
                            display: flex;
                            min-width: 0;
                            min-height: 40px;
                            flex: 1;
                            align-items: center;
                            justify-content: center;
                            padding: 8px 12px;
                            border-radius: 10px;
                            color: ${theme.colours.darkGray};
                            font-size: 15px;
                            font-weight: 600;
                            line-height: 1.3;
                            text-decoration: none;
                            white-space: nowrap;
                            &:hover {
                                background: ${theme.colours.white};
                            }
                            &[aria-current='page'] {
                                background: ${theme.colours.primary};
                                color: #201f24;
                                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
                            }
                            &:focus-visible {
                                outline: 2px solid ${theme.colours.primary};
                                outline-offset: 2px;
                            }
                        `}
                    >
                        {section.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
}
