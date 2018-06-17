import sys
import logging
import rds_config
import pymysql
#rds settings
rds_host  = "spajam-myms-kitchen-database.cgpqonbmwtf6.ap-northeast-1.rds.amazonaws.com"
name = rds_config.db_username
password = rds_config.db_password
db_name = rds_config.db_name


logger = logging.getLogger()
logger.setLevel(logging.INFO)

try:
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except:
    logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
    sys.exit()

logger.info("SUCCESS: Connection to RDS mysql instance succeeded")
def lambda_handler(event, context):
    """
    This function fetches content from mysql RDS instance
    """

    item_count = 0

    print(event)
    print(event['user_name'])

    with conn.cursor() as cur:
        cur.execute('insert into User (name) values("%s")' % event["user_name"])
        conn.commit()
        for row in cur:
            item_count += 1
            logger.info(row)
            #print(row)

    cur1 = conn.cursor()
    coount = cur1.execute("select * from User")
    return{
      "type" : "success",
      "id" : count ,
    }

