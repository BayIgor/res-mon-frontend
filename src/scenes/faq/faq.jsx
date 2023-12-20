import React from "react";
import {Box, useTheme} from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../themes/mainTheme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
      <Box m="20px">
        <Header title="FAQ" subtitle="Страница часто задаваемых вопросов" />

        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              Если вы не нашли ответ здесь
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Если у вас возниклки трудности или неполдаки при использовании Монитора Ресурсов.
              Обратитесь на почту службы поддержки resourcemonitortech@gmail.com
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              Что такое Spring?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Spring - это фреймворк для разработки приложений на Java, обеспечивающий удобство создания различных
              типов приложений, включая веб-приложения и микросервисы, через использование инструментов для управления
              зависимостями, обработки запросов, работой с базами данных и другими функциями.
              Он позволяет улучшить производительность, расширяемость и обслуживаемость приложений.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography color={colors.greenAccent[500]} variant="h5">
              Что такое JWT?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              JWT (JSON Web Token) - это стандартизированный формат токена, предназначенный для безопасной передачи
              информации между двумя сторонами в формате JSON. Он используется для аутентификации и передачи
              данных между клиентом и сервером в виде компактного и самодостаточного токена. JWT состоит из
              трех частей: заголовка (header), полезной нагрузки (payload) и подписи (signature).
              Заголовок содержит тип токена и используемый алгоритм шифрования, полезная нагрузка содержит информацию,
              которая передается между сторонами, а подпись создается на основе заголовка, полезной нагрузки и
              секретного ключа, обеспечивая проверку целостности данных. JWT часто используется в аутентификации и
              авторизации в веб-приложениях и API.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
  );
};

export default FAQ;
