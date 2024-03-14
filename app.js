const express = require('express');
const app = express();
const PORT = process.env.PORT || 3066; // 포트 번호 설정
const path = require('path');

// 정적 파일 제공 설정
app.use('/public', express.static(path.join(__dirname, 'public')));

// 미들웨어 설정
app.use(express.json()); // JSON 형식의 데이터를 파싱하기 위한 미들웨어 설정

// 루트 엔드포인트 설정
app.get('/', (req, res) => {
    res.send('서버가 정상적으로 작동 중입니다.');
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 포트 ${PORT}에서 작동 중입니다.`);
});

const mysql = require('mysql');

// MySQL 데이터베이스 연결 정보 설정
const connection = mysql.createConnection({
    host: 'localhost', // 데이터베이스 호스트명
    user: 'root', // 데이터베이스 사용자명
    password: 'dusdn8853', // 데이터베이스 암호
    database: 'spiders' // 사용할 데이터베이스명
});

// 데이터베이스 연결
connection.connect((err) => {
    if (err) {
        console.error('데이터베이스 연결 오류:', err);
        return;
    }
    console.log('MySQL 데이터베이스에 연결되었습니다.');
});

// 사용자가 등록한 일정을 데이터베이스에 저장하는 엔드포인트 설정
app.post('/schedule', (req, res) => {
    const { YEAR, MONTH,DAY, TIME, NAME } = req.body; 

    // MySQL 쿼리 실행하여 데이터베이스에 일정 정보 저장
    const sql = `INSERT INTO spiders (YEAR,MONTH,DAY,TIME, NAME) VALUES ('${YEAR}', '${MONTH}','${DAY}', '${TIME}', '${NAME}')`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.error('데이터베이스 쿼리 오류:', err);
            res.status(500).json({ error: '데이터베이스 오류 발생' });
            return;
        }
        console.log('일정이 성공적으로 데이터베이스에 저장되었습니다.');
        res.status(200).json({ message: '일정이 성공적으로 등록되었습니다.' });
    });
});

// 클라이언트에게 데이터베이스에서 일정을 가져와서 전달하는 엔드포인트 설정
app.get('/schedule', (req, res) => {
    // MySQL 쿼리 실행하여 데이터베이스에서 일정 정보 가져오기
    const sql = 'SELECT * FROM spiders';
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('데이터베이스 쿼리 오류:', err);
            res.status(500).json({ error: '데이터베이스 오류 발생' });
            return;
        }
        console.log('일정을 성공적으로 가져왔습니다.');
        res.status(200).json(results);
    });
});


// DELETE 요청을 처리하는 엔드포인트 설정
app.delete('/delete-schedule', (req, res) => {
    const { YEAR, MONTH, DAY, TIME, NAME } = req.body;

    const query = "DELETE FROM spiders WHERE YEAR =? AND MONTH =? AND DAY = ? AND TIME = ? AND NAME = ?";
    connection.query(query, [YEAR, MONTH, DAY, TIME, NAME], (error, results, fields) => {
        if (error) {
            // 오류 발생 시 클라이언트에게 오류 응답을 보냅니다.
            res.status(500).send('일정 삭제 중 오류가 발생했습니다.');
        } else {
            // 삭제된 row가 있는지 확인
            if (results.affectedRows > 0) {
                // 삭제가 성공하면 클라이언트에게 성공 응답을 보냅니다.
                res.status(200).send('일정이 성공적으로 삭제되었습니다.');
            } else {
                // 일정이 존재하지 않는 경우 클라이언트에게 적절한 응답을 보냅니다.
                res.status(404).send('삭제할 일정을 찾을 수 없습니다.');
            }
        }
    });
});

// 서버 엔드포인트 코드 수정
app.put('/update-schedule', (req, res) => {
    const { beforeSchedule, updatedSchedule } = req.body;

    // 변경 전의 값과 변경 후의 값을 모두 사용하여 일치하는 행을 찾습니다.
    const query = "UPDATE spiders SET MONTH = ?, DAY = ?, TIME = ?, NAME = ? WHERE MONTH = ? AND DAY = ? AND TIME = ? AND NAME = ?";
    connection.query(query, [updatedSchedule.MONTH, updatedSchedule.DAY, updatedSchedule.TIME, updatedSchedule.NAME, beforeSchedule.MONTH, beforeSchedule.DAY, beforeSchedule.TIME, beforeSchedule.NAME], (error, results, fields) => {
        if (error) {
            res.status(500).send('일정 수정 중 오류가 발생했습니다.');
        } else {
            if (results.affectedRows > 0) {
                res.status(200).send('일정이 성공적으로 수정되었습니다.');
            } else {
                res.status(404).send('수정할 일정을 찾을 수 없습니다.');
            }
        }
    });
});
