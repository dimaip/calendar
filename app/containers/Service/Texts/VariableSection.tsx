import React from 'react';
import { css } from 'emotion';
import Tooltip from 'components/Tooltip/Tooltip';
import { useTheme } from 'emotion-theming';

const VariableSection = ({ children, date }) => {
    const theme = useTheme();
    return (
        <div
            className={css`
                position: relative;
                background: ${theme.colours.bgGray};
                margin: 24px -12px 24px -12px;
                padding: 12px 12px 12px 12px;
                width: fit-content;
            `}
        >
            <div
                className={css`
                    position: absolute;
                    top: 4px;
                    right: 10px;
                `}
            >
                <Tooltip>
                    Изменяемые части богослужения составлены нашим роботом-уставщиком. Он иногда ошибается. За наиболее
                    точной информацией обращайтесь к{' '}
                    <a
                        className={css`
                            text-decoration: underline;
                        `}
                        href={`http://www.patriarchia.ru/bu/${date}`}
                        target="_blank"
                    >
                        богослужебным указаниям
                    </a>
                </Tooltip>
            </div>
            {children}
        </div>
    );
};
export default VariableSection;
