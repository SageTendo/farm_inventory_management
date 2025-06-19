import React from "react";
import {Card} from "react-bootstrap";

interface SummaryCardProps {
  title?: string;
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  bg?: string; // e.g. 'light', 'dark', 'primary', etc.
  textColor?: string; // e.g. 'white', 'dark', 'muted', etc.
  border?: string; // e.g. 'primary', 'success', etc.
}

export function SummaryCard({
                              title,
                              className = "w-100 h-100",
                              children,
                              footer,
                              bg = "dark",
                              textColor = "white",
                              border,
                            }: SummaryCardProps) {
  return (
    <Card
      className={className}
      bg={bg}
      text={textColor}
      border={border}
    >
      {title && <Card.Header className="fw-bold border-1 fs-3 mb-3">{title}</Card.Header>}
      <Card.Body className="d-flex align-items-center justify-content-end">
        {children}
      </Card.Body>
      {footer && <Card.Footer>{footer}</Card.Footer>}
    </Card>
  );
}